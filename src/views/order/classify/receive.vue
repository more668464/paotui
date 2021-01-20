<template>
  <div>
    <!-- 表格 -->
    <div>
      <el-table
        :data="receiveData"
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
        <el-table-column prop="waiterId" label="已派单员工"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="toDetail(scope.row)" type="text" size="small"
              >详情</el-button
            >
            <el-button @click="toTake(scope.row)" type="text" size="small"
              >接单</el-button
            ><el-button @click="tocancle(scope.row)" type="text" size="small"
              >拒绝此单</el-button
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
          :total="receiveTotal"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { takeOrder } from "@/api/order";
export default {
  data() {
    return {
      queryParams: {
        page: 1,
        pageSize: 10,
        status: "待接单",
      },
    };
  },
  computed: {
    ...mapGetters("order", ["receiveTotal", "receiveData"]),
  },
  methods: {
    ...mapActions("order", ["queryPage", "cancelSendOrder"]),
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
    tocancle(row) {
      this.cancelSendOrder({ orderId: row.id }).then(() => {
        this.$message({
          message: "已取消派单",
          type: "success",
        });
        this.queryPage(this.queryParams);
      });
    },
    toTake(row) {
      takeOrder({ orderId: row.id, waiterId: row.waiterId }).then(() => {
        this.$message({
          message: "接单成功",
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