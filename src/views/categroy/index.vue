<template>
  <div>
    <!-- 按钮 -->
    <div class="options">
      <el-button
        type="danger"
        size="small"
        @click="batchDel"
        :disabled="isDisable"
        >批量删除</el-button
      >
      <el-button type="primary" size="small" @click="toAdd">添加</el-button>
      <el-input
        v-model="queryParams.name"
        placeholder="栏目名称"
        size="small"
      ></el-input>
      <el-button type="primary" @click="toSearch" size="small">查询</el-button>
    </div>
    <!-- 表格 -->
    <div class="tables">
      <el-table
        stripe
        :data="categoryData"
        style="width: 100%"
        height="calc(100vh - 220px)"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>

        <el-table-column prop="id" label="编号" width="180"> </el-table-column>
        <el-table-column prop="name" label="服务类型名称" width="180">
        </el-table-column>
        <el-table-column prop="num" label="数量"> </el-table-column>
        <!-- <el-table-column prop="parentId" label="所属类型"> </el-table-column> -->
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="toDelete(scope.row)" type="text" size="small"
              >删除</el-button
            >
            <el-button @click="toEdit(scope.row)" type="text" size="small"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="queryParams.page"
          :page-sizes="[5, 10, 15]"
          :page-size="queryParams.pageSize"
          layout="total,sizes, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 模态框 -->
    <div>
      <el-dialog :title="title" :visible.sync="visible" @close="resetForm">
        <!-- ref 找到表单实例本身。。重置表单验证可用 -->
        <el-form :model="form" :rules="rules" ref="ruleForm">
          <el-form-item
            label="服务类型："
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="数量" :label-width="formLabelWidth" prop="num">
            <el-input v-model="form.num" auto-complete="off"></el-input>
          </el-form-item>

          <!-- <el-form-item label="所属类型：" :label-width="formLabelWidth">
            <el-select v-model="form.parentId" placeholder="请选择所属类型">
              <el-option
                v-for="item in parents"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item> -->
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
import { deleteById } from "@/api/category.js";
export default {
  data() {
    return {
      queryParams: {
        page: 1,
        pageSize: 10,
        name: "",
      },
      ids: [],
      form: {},
      formLabelWidth: "180px",
      visible: false,
      title: "新增服务类型",
      rules: {
        name: [{ required: true, message: "请输入服务类型", trigger: "blur" }],
        num: [{ required: true, message: "请输入序号", trigger: "blur" }],
        parentId: [
          { required: true, message: "请选择所属类型", trigger: "change" },
        ],
      },
      isDisable: true,
    };
  },
  computed: {
    ...mapGetters("category", [
      "categoryData",
      "total",
      "categoryAllData",
      "parents",
    ]),
    // parents() {
    //   return this.categoryAllData.map((item) => {});
    // },
  },
  methods: {
    ...mapActions("category", ["findAllcategory", "findAll", "saveOrUpdate"]),
    // 分页
    handleSizeChange(val) {
      this.queryParams.pageSize = val;
      this.page = 1;
      this.findAllcategory(this.queryParams);
    },
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.findAllcategory(this.queryParams);
    },
    //添加
    toAdd() {
      this.visible = true;
      this.title = "新增服务类型";
      this.form = {};
    },
    //重置表单
    resetForm() {
      this.$refs["ruleForm"].resetFields();
    },
    //确认保存
    toSave() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.saveOrUpdate({
            form: this.form,
            queryParams: this.queryParams,
          }).then(() => {
            this.visible = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //查找
    toSearch() {
      this.queryParams.page = 1;
      this.findAllcategory(this.queryParams);
    },
    //删除
    toDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
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
                this.findAllcategory(this.queryParams);
              } else {
                this.$notify.error({
                  title: "错误",
                  message: "删除失败",
                });
              }
            })
            .catch((err) => {});
        })
        .catch(() => {
          this.$notify.error({
            title: "错误",
            message: "删除失败",
          });
        });
    },
    handleSelectionChange(val) {
      this.ids = val.map((item) => item.id); //批量删除的id数组
      if (this.ids.length > 0) {
        this.isDisable = false;
      } else {
        this.isDisable = true;
      }
    },
    //批量删除
    batchDel() {},
    //编辑
    toEdit(row) {
      (this.form = { ...row }),
        (this.visible = true),
        (this.title = "修改服务类型");
    },
  },
  created() {
    this.findAllcategory(this.queryParams);
    this.findAll();
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.options {
  overflow: hidden;
  & > * {
    float: left;
    margin-left: 10px;
  }
  & > div {
    width: 200px;
  }
}

.tables {
  margin: 30px 0;
}
</style>