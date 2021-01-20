<template>
  <div class="wrapper">
    <div class="tables">
      <el-table
        :data="tempData"
        style="width: 100%"
        stripe
        height="calc(100vh - 220px)"
      >
        <el-table-column prop="id" label="订单编号" width="180">
        </el-table-column>
        <el-table-column prop="orderTime" label="下单时间" width="180">
        </el-table-column>
        <el-table-column prop="total" label="总价"> </el-table-column>
        <el-table-column prop="status" label="状态"> </el-table-column>
        <el-table-column prop="customerId" label="顾客ID"> </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="toDetail(scope.row)" type="text" size="small"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        :current-page.sync="page"
        :page-sizes="[5, 10, 15]"
        :page-size.sync="pageSize"
        layout="sizes, prev, pager, next"
        :total="waiterOrderQueryData.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
    ...mapGetters("order", ["waiterOrderQueryData"]),
    tempData() {
      return this.waiterOrderQueryData.slice(
        (this.page - 1) * this.pageSize,
        this.page * this.pageSize
      );
    },
  },
  methods: {
    ...mapActions("order", ["orderQuery"]),
    toDetail(row) {
      this.$router.push(`/orderDetail/${row.id}/index`);
      console.log(row);
    },
  },
  created() {
    // console.log(this.$route);
    this.orderQuery({
      id: this.id,
      type: this.type,
    });
  },
  mounted() {},
};
</script>
<style scoped>
</style>