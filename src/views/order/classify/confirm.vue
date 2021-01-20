<template>
  <div>
    <!-- 表格 -->
    <div>
      <el-table
        :data="confirmData"
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
            <el-button @click="toComfirm(scope.row)" type="text" size="small"
              >确认订单</el-button
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
          :total="confirmTotal"
        >
        </el-pagination>
      </div>
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
        status: "待确认",
      },
      orderId: 1,
    };
  },
  computed: {
    ...mapGetters("order", ["confirmTotal", "confirmData"]),
  },
  methods: {
    ...mapActions("order", ["queryPage", "confirmOrder"]),
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
    toComfirm(row) {
      this.orderId = row.id;
      this.confirmOrder({ orderId: row.id }).then(() => {
        this.$message({
          message: "确认成功",
          type: "success",
        });
        this.queryPage(this.queryParams);
      });
      console.log(1);
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