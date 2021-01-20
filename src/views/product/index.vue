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
        placeholder="名字"
        size="small"
      ></el-input>
      <el-button type="primary" @click="toSearch" size="small">查询</el-button>
    </div>
    <!-- 表格 -->
    <div class="tables">
      <el-table
        :data="productData"
        height="calc(100vh - 220px)"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          type="index"
          :index="indexMethod"
          label="编号"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="name" label="项目名称" width="180">
        </el-table-column>
        <el-table-column prop="price" label="价格"> </el-table-column>
        <el-table-column prop="description" label="项目描述"> </el-table-column>
        <el-table-column label="所属类型">
          <template slot-scope="scope">
            <span>{{
              categoryAllData.filter((item) => {
                return item.id == scope.row.categoryId;
              })[0].name
            }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="toSaveOrder(scope.row)" type="text" size="small"
              >下单</el-button
            >
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
        <el-form :model="form" :rules="rules" ref="ruleForm">
          <el-form-item
            label="项目名称："
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="价格："
            :label-width="formLabelWidth"
            prop="price"
          >
            <el-input v-model="form.price" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="栏目："
            :label-width="formLabelWidth"
            prop="categoryId"
          >
            <el-select v-model="form.categoryId" placeholder="请选择栏目">
              <el-option
                v-for="item in categoryAllData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="介绍"
            :label-width="formLabelWidth"
            prop="description"
          >
            <el-input type="textarea" v-model="form.description"></el-input>
          </el-form-item>
          <!-- <el-upload
            class="upload-demo"
            action="http://120.26.177.102:5588/file/upload"
            :on-success="uploadSuccess"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload> -->
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

export default {
  data() {
    return {
      queryParams: {
        page: 1,
        pageSize: 10,
        name: "",
      },
      ids: [],
      visible: false, //模态框显示隐藏
      formLabelWidth: "120px",
      title: "新增产品信息",
      form: {
        categoryId: "",
      },
      rules: {
        name: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        description: [
          { required: true, message: "请输入介绍", trigger: "blur" },
        ],
        categoryId: [
          { required: true, message: "请选择栏目", trigger: "change" },
        ],
      },
      //是否显示批量删除
      isDisable: true,
    };
  },
  computed: {
    ...mapGetters("product", ["productData", "total"]),
    ...mapGetters("category", ["categoryAllData"]),
  },
  methods: {
    ...mapActions("product", [
      "findAllProduct",
      "batchDelete",
      "saveOrUpdate",
      "deleteById",
    ]),
    ...mapActions("category", ["findAll"]),
    ...mapActions("order", ["saveOrder"]),
    //分页
    handleSizeChange(val) {
      this.queryParams.pageSize = val;
      this.queryParams.page = 1;

      this.findAllProduct(this.queryParams);
    },
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.findAllProduct(this.queryParams);
    },
    //编号
    indexMethod(index) {
      let { pageSize, page } = this.queryParams;
      return (page - 1) * pageSize + index + 1;
    },
    //多选
    handleSelectionChange(val) {
      //val为选中对象组成的数组
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
      this.findAllProduct(this.queryParams);
    },
    //添加
    toAdd() {
      this.form = {};
      this.visible = true;
    },
    //关闭模态框后重置表单
    resetForm() {
      this.$refs["ruleForm"].resetFields(); //重置表单
    },
    //上传图片成功回调
    uploadSuccess(response) {
      console.log(response);
    },
    //模态框确认
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

    //删除
    toDelete(row) {
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
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //发请求删除
          this.batchDelete({
            ids: this.ids.join(","),
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
      this.title = "修改产品信息";
    },
    //详情
    toDetail(row) {
      //路由跳转
      this.$router.push(`/productDetail/${row.id}/index`);
    },
    toSaveOrder(row) {
      this.saveOrder({
        orderLines: [
          {
            price: row.price,
            productId: row.id,
            number: 1,
          },
        ],
        customerId: 27,
        addressId: 2228,
      }).then((res) => {
        this.$message({
          title: "成功",
          message: "下单成功",
          type: "success",
        });
      });
    },
  },
  created() {
    this.findAll();
    this.findAllProduct(this.queryParams);
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