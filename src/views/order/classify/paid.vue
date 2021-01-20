<template>
  <div>
    <!-- 表格 -->
    <div>
      <el-table
        :data="paidData"
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
            <el-button @click="toPaid(scope.row)" type="text" size="small"
              >支付</el-button
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
          :total="paidTotal"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { rejectOrder } from "@/api/order";
export default {
  data() {
    return {
      queryParams: {
        page: 1,
        pageSize: 10,
        status: "待支付",
      },
    };
  },
  computed: {
    ...mapGetters("order", ["paidData", "paidTotal"]),
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
    toPaid(row) {
      rejectOrder({ orderId: row.id }).then(() => {
        this.$message({
          message: "支付成功",
          type: "success",
        });
        this.queryPage(this.queryParams);
      });
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