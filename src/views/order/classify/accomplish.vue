<template>
  <div>
    <!-- 表格 -->
    <div>
      <el-table
        :data="accomplishData"
        height="calc(100vh - 220px)"
        border
        style="width: 100%"
      >
        <el-table-column prop="id" label="订单编号" width="180">
        </el-table-column>
        <el-table-column prop="orderTime" label="下单时间" width="180">
        </el-table-column>
        <el-table-column prop="total" label="总价"> </el-table-column>
        <el-table-column prop="status" label="状态"> </el-table-column>
        <el-table-column prop="customerId" label="顾客ID"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="toDetail(scope.row)" type="text" size="small"
              >详情</el-button
            >
            <el-button
              @click="toComment(scope.row)"
              type="text"
              :disabled="scope.row.remark === 1 ? true : false"
              size="small"
              >{{ scope.row.remark === 1 ? "已评论" : "评论" }}</el-button
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
          :total="accomplishTotal"
        >
        </el-pagination>
      </div>
    </div>
    <div>
      <el-dialog title="评论" :visible.sync="visible" @close="resetForm">
        <!-- ref 找到表单实例本身。。重置表单验证可用 -->
        <el-form :model="form" ref="ruleForm">
          <el-form-item>
            <el-input
              v-model="form.content"
              type="textarea"
              auto-complete="off"
            ></el-input>
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
import { saveOrUpdate as saveOrUpdateComment } from "@/api/comment";
import moment from "moment";
export default {
  data() {
    return {
      queryParams: {
        page: 1,
        pageSize: 10,
        status: "已完成",
      },
      form: {},
      visible: false, //模态框显示隐藏
      remark: 0,
    };
  },
  computed: {
    ...mapGetters("order", ["accomplishTotal", "accomplishData"]),
  },
  methods: {
    ...mapActions("order", ["queryPage"]),
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.queryParams.pageSize = val;
      this.queryParams.page = 1;
      this.queryPage(this.queryParams);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryParams.page = val;
      this.queryPage(this.queryParams);
    },
    //详情
    toDetail(row) {
      this.$router.push(`/orderDetail/${row.id}/index`);
    },
    //评论
    toComment(row) {
      this.form.orderId = row.id;
      this.form.cusId = row.customerId;
      this.form.commentTime = moment().valueOf();
      this.visible = true;
      row.remark = 1;
      console.log(row);
    },
    //关闭模态框后重置表单
    resetForm() {
      this.$refs["ruleForm"].resetFields(); //重置表单
    },
    toSave() {
      console.log(this.form);
      saveOrUpdateComment({
        ...this.form,
      });
      this.visible = false;
    },
  },
  created() {
    this.queryPage(this.queryParams);
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>