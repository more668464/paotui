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
      <el-input
        v-model="queryParams.cusId"
        placeholder="顾客ID"
        size="small"
      ></el-input>
      <el-button type="primary" @click="toSearch" size="small">查询</el-button>
    </div>
    <!-- 表格 -->
    <div class="tables">
      <el-table
        stripe
        :data="commentData"
        style="width: 100%"
        height="calc(100vh - 220px)"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>

        <el-table-column prop="id" label="编号" width="180"> </el-table-column>
        <el-table-column prop="content" label="评论内容" width="180">
        </el-table-column>
        <el-table-column prop="commentTime" label="评论时间"> </el-table-column>
        <el-table-column prop="orderId" label="产品ID"> </el-table-column>
        <el-table-column prop="cusId" label="顾客ID"> </el-table-column>
        <el-table-column prop="status" label="状态"> </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button @click="toDelete(scope.row)" type="text" size="small"
              >删除</el-button
            >
            <el-button @click="passTest(scope.row)" type="text" size="small"
              >通过审核</el-button
            ><el-button @click="rejectTest(scope.row)" type="text" size="small"
              >拒绝审核</el-button
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { deleteById } from "@/api/comment.js";
export default {
  data() {
    return {
      queryParams: {
        page: 1,
        pageSize: 10,
        cusId: "",
        ids: [],
      },
      form: {},
      formLabelWidth: "200px",
      visible: false,
      title: "新增栏目",
      rules: {
        name: [{ required: true, message: "请输入栏目名称", trigger: "blur" }],
        num: [{ required: true, message: "请输入序号", trigger: "blur" }],
        parentId: [
          { required: true, message: "请选择所属栏目", trigger: "change" },
        ],
      },
      commentid: null,
      isDisable: true,
    };
  },
  computed: {
    ...mapGetters("comment", ["commentData", "total"]),
  },
  methods: {
    ...mapActions("comment", [
      "findAllcomment",
      "saveOrUpdate",
      "batchDelete",
      "commentExamine",
      "commentRefuseExamine",
    ]),
    // 分页
    handleSizeChange(val) {
      this.queryParams.pageSize = val;
      this.page = 1;
      this.findAllcomment(this.queryParams);
    },
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.findAllcomment(this.queryParams);
    },

    //查找
    toSearch() {
      this.queryParams.page = 1;
      this.findAllcomment(this.queryParams);
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
                this.findAllcomment(this.queryParams);
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
    //审核
    passTest(row) {
      this.commentExamine(row.id).then((res) => {
        this.$message({
          showClose: true,
          message: "已通过审核",
          type: "success",
        });
        this.findAllcomment(this.queryParams);
      });
    },
    rejectTest(row) {
      this.commentRefuseExamine(row.id).then((res) => {
        this.$message({
          showClose: true,
          message: "已拒绝审核",
          type: "success",
        });
        this.findAllcomment(this.queryParams);
      });
    },
  },
  created() {
    this.findAllcomment(this.queryParams);
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