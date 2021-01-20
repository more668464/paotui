<template>
  <div>
    <div class="options">
      <el-button
        type="danger"
        size="small"
        @click="batchDel"
        :disabled="isDisable"
        >批量删除</el-button
      >
      <el-button type="primary" size="small" @click="toAdd">添加</el-button>
      <!-- <el-input
        v-model="queryParams.status"
        placeholder="状态"
        size="small"
      ></el-input>
      <el-button type="primary" @click="toSearch" size="small">查询</el-button> -->
    </div>
    <!-- 表格 -->
    <div class="tables">
      <el-table
        stripe
        :data="customerData"
        style="width: 100%"
        height="calc(100vh - 220px)"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          type="index"
          :index="indexMethod"
          label="编号"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="realname"
          label="姓名"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          width="100"
        ></el-table-column>
        <el-table-column prop="telephone" label="手机号"> </el-table-column>
        <el-table-column prop="qq" label="QQ"> </el-table-column>
        <el-table-column prop="idCard" label="身份证"> </el-table-column>
        <el-table-column prop="money" label="余额"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="toDelete(scope.row)" type="text" size="small"
              >删除</el-button
            >
            <el-button @click="toEdit(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button @click="toDetail(scope.row)" type="text" size="small"
              >详情</el-button
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
          :page-sizes="[5, 10, 15, 20]"
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
            label="用户名："
            :label-width="formLabelWidth"
            prop="username"
          >
            <el-input v-model="form.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="姓名："
            :label-width="formLabelWidth"
            prop="realname"
          >
            <el-input
              v-model="form.realname"
              auto-complete="off"
            ></el-input> </el-form-item
          ><el-form-item label="性别：" :label-width="formLabelWidth">
            <el-input v-model="form.gender" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="手机号："
            :label-width="formLabelWidth"
            prop="telephone"
          >
            <el-input v-model="form.telephone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="QQ：" :label-width="formLabelWidth">
            <el-input v-model="form.qq" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="密码："
            :label-width="formLabelWidth"
            prop="password"
          >
            <el-input
              placeholder="请输入密码"
              v-model="form.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="身份证：" :label-width="formLabelWidth">
            <el-input v-model="form.idCard" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="toSave">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 顾客管理
    {{ total }}
    {{ customerData }} -->
  </div>
</template>

<script>
// 导入vuex或者axios
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      queryParams: {
        page: 1,
        pageSize: 10,
        status: "",
      },
      ids: [],
      visible: false, //模态框显示隐藏
      formLabelWidth: "120px",
      title: "新增客户信息",
      form: {},
      //表单验证
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        realname: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
        ],
        telephone: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { min: 11, max: 11, message: "长度11字符", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
      },
      //批量删除按钮禁用
      isDisable: true,
    };
  },
  computed: {
    ...mapGetters("customer", ["total", "customerData"]),
  },
  methods: {
    ...mapActions("customer", [
      "findAll",
      "deleteById",
      "saveOrUpdate",
      "batchDelete",
    ]),
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.queryParams.pageSize = val;
      this.queryParams.page = 1;

      this.findAll(this.queryParams);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryParams.page = val;
      this.findAll(this.queryParams);
    },
    //自定义索引
    indexMethod(index) {
      return (
        (this.queryParams.page - 1) * this.queryParams.pageSize + index + 1
      );
    },
    //多选框
    handleSelectionChange(val) {
      //val是一个选中对象组成的数组
      // console.log(val);
      this.ids = val.map((item) => item.id); //批量删除的id数组
      if (this.ids.length > 0) {
        this.isDisable = false;
      } else {
        this.isDisable = true;
      }
    },
    //查询
    toSearch() {
      this.queryParams.page = 1;
      this.findAll(this.queryParams);
    },
    //添加
    toAdd() {
      this.title = "新增顾客信息";
      this.form = {};
      this.visible = true;
    },

    //保存
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
    //关闭模态框后重置表单
    resetForm() {
      this.$refs["ruleForm"].resetFields(); //重置表单
    },
    //删除
    toDelete(row) {
      console.log(row);
      console.log(row);
      //询问是否删除
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //发请求删除
          this.deleteById({
            id: row.id,
            queryParams: this.queryParams,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //批量删除
    batchDel() {
      this.$confirm("此操作将永久批量删除文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //发请求删除
          this.batchDelete({
            ids: this.ids.toString(),
            queryParams: this.queryParams,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //编辑
    toEdit(row) {
      this.form = { ...row };
      this.visible = true;
      this.title = "修改顾客信息";
    },
    //详情
    toDetail(row) {
      //路由跳转
      console.log(row);
      this.$router.push({
        path: `/customerDetail/${row.id}/index`,
        query: {
          type: row.type,
        },
      });
    },
  },
  created() {
    this.findAll(this.queryParams);
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