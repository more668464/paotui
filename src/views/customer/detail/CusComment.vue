<template>
  <div class="wrapper">
    <div class="tables">
      <el-table
        :data="cusComment"
        style="width: 100%"
        stripe
        height="calc(100vh - 220px)"
      >
        <el-table-column prop="orderId" label="订单编号" width="150">
        </el-table-column>
        <el-table-column prop="content" label="评论内容" width="400">
        </el-table-column>
        <el-table-column prop="commentTime" label="评论时间"> </el-table-column>
        <el-table-column prop="status" label="状态"> </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="toDelete(scope.row)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { deleteById } from "@/api/comment.js";

export default {
  data() {
    return {
      id: this.$route.params.id,
      page: 1,
      pageSize: 10,
      type: this.$route.query.type,
    };
  },
  computed: {
    ...mapGetters("comment", ["cusComment"]),
  },
  methods: {
    ...mapActions("comment", ["findCommentByCus"]),
    //删除
    toDelete(row) {
      this.$confirm("是否继续删除该评论?", "删除评论", {
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
                this.findCommentByCus(this.id);
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
  },
  created() {
    this.findCommentByCus(this.id);
  },
  mounted() {},
};
</script>
<style scoped>
</style>