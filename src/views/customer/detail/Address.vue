<template>
  <div class="wrapper">
    <div class="options">
      <el-button
        type="danger"
        size="small"
        @click="batchDel"
        :disabled="isDisable"
        >批量删除</el-button
      >
      <el-button type="primary" size="small" @click="toAdd">添加</el-button>
    </div>
    <div>
      <el-table
        :data="tempData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        height="calc(100vh - 220px)"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="序号" width="180" type="index">
        </el-table-column>
        <el-table-column prop="province" label="省" width="180">
        </el-table-column>
        <el-table-column prop="city" label="市"> </el-table-column>
        <el-table-column prop="area" label="区/县"> </el-table-column>
        <el-table-column prop="address" label="街道"> </el-table-column>
        <el-table-column prop="telephone" label="手机号"> </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="toEdit(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button @click="toDelete(scope.row)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        :current-page.sync="page"
        :page-sizes="[2, 5, 10, 15]"
        :page-size.sync="pageSize"
        layout="sizes, prev, pager, next"
        :total="addressData.length"
      >
      </el-pagination>
    </div>

    <!-- 模态框 -->
    <div>
      <el-dialog :title="title" :visible.sync="visible" @close="resetForm">
        <!-- ref 找到表单实例本身。。重置表单验证可用 -->
        <el-form :model="form" :rules="rules" ref="ruleForm">
          <el-form-item
            label="省："
            :label-width="formLabelWidth"
            prop="province"
          >
            <el-input v-model="form.province" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="市：" :label-width="formLabelWidth" prop="city">
            <el-input v-model="form.city" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="区/县："
            :label-width="formLabelWidth"
            prop="area"
          >
            <el-input
              placeholder="请输入所在区/县"
              v-model="form.area"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="街道："
            :label-width="formLabelWidth"
            prop="address"
          >
            <el-input
              placeholder="请输入所在街道"
              v-model="form.address"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="手机号："
            :label-width="formLabelWidth"
            prop="telephone"
          >
            <el-input v-model="form.telephone" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="toSave">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  findByCustomerId,
  deleteById,
  saveOrUpdateAddress,
} from "@/api/address.js";

export default {
  data() {
    return {
      id: this.$route.params.id,
      page: 1,
      pageSize: 10,
      visible: false, //模态框显示隐藏
      title: "新增客户信息",
      form: {},
      formLabelWidth: "120px",
      ids: [],

      //表单验证
      rules: {
        province: [
          { required: true, message: "请输入所在省", trigger: "blur" },
        ],
        city: [{ required: true, message: "请输入所在市", trigger: "blur" }],
        telephone: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { min: 11, max: 11, message: "长度11字符", trigger: "blur" },
        ],
        area: [{ required: true, message: "请输入所在区", trigger: "blur" }],
        address: [
          { required: true, message: "请选择详细地址", trigger: "change" },
        ],
      },
      isDisable: true,
    };
  },
  computed: {
    ...mapGetters("customer", ["addressData"]),
    tempData() {
      return this.addressData.slice(
        (this.page - 1) * this.pageSize,
        this.page * this.pageSize
      );
    },
  },
  methods: {
    ...mapActions("customer", [
      "findAddressByCustomerId",
      "saveOrUpdateAddress",
      "batchDeleteAddress",
    ]),
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },

    //删除
    toDelete(row) {
      this.$confirm("是否删除所选地址", "删除地址", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //发请求删除
          deleteById({
            id: row.id,
          })
            .then((res) => {
              if (res.status == 200) {
                //提示删除成功
                this.$notify({
                  title: "成功",
                  message: "删除成功",
                  type: "success",
                });
                //刷新页面
                this.findAddressByCustomerId({ id: this.id });
              } else {
                this.$message({
                  type: "warning",
                  message: "已取消删除",
                });
              }
            })
            .catch((err) => {});
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "已取消删除",
          });
        });
    },
    //关闭模态框后重置表单
    resetForm() {
      this.$refs["ruleForm"].resetFields(); //重置表单
    },
    toEdit(row) {
      this.form = { ...row };
      this.visible = true;
      this.title = "修改地址";
    },
    //保存
    toSave() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.saveOrUpdateAddress({
            form: this.form,
            customerId: this.id,
          }).then(() => {
            this.visible = false;
            this.$notify({
              title: "成功",
              message: "保存成功",
              type: "success",
            });
            this.findAddressByCustomerId({ id: this.id });
          });
        } else {
          this.$message({
            type: "error",
            message: "保存失败",
          });
          console.log("error submit!!");
          return false;
        }
      });
    },
    //新增
    toAdd() {
      this.title = "新增地址";
      this.form = {};
      this.visible = true;
    },
    //多选框
    handleSelectionChange(val) {
      //val是一个选中对象组成的数组
      this.ids = val.map((item) => item.id); //批量删除的id数组
      if (this.ids.length > 0) {
        this.isDisable = false;
      } else {
        this.isDisable = true;
      }
    },
    //批量删除
    batchDel() {
      this.$confirm("是否继续删除所选地址?", "删除地址", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //发请求删除
          this.batchDeleteAddress({
            ids: this.ids.toString(),
          });
          this.findAddressByCustomerId({ id: this.id });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.findAddressByCustomerId({ id: this.id });
  },
  mounted() {},
};
</script>
<style scoped>
.el-table .warning-row {
  background: pink;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>