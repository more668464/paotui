<template>
  <div class="wrapper">
    <div>
      <el-table
        :data="queryShouData"
        style="width: 100%"
        height="calc(100vh - 220px)"
      >
        <el-table-column prop="id" label="订单编号" width="180">
        </el-table-column>
        <el-table-column prop="money" label="金额" width="180">
        </el-table-column>
        <el-table-column prop="type" label="类型"> </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column prop="userId" label="员工ID"> </el-table-column>
        <el-table-column prop="transferAccounts" label="凭证">
        </el-table-column>
        <el-table-column fixed="right" label="状态" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.status == 1 ? "已审核" : "未审核" }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="queryParams.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryParams.pageSize"
        layout="total,sizes, prev, pager, next"
        :total="queryShouTotal"
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
      queryParams: {
        page: 1,
        pageSize: 10,
        type: "提现",
      },
    };
  },
  computed: {
    ...mapGetters("waiter", ["queryShouData", "queryShouTotal"]),
  },
  methods: {
    ...mapActions("waiter", ["queryShou"]),
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.queryParams.pageSize = val;
      this.queryParams.page = 1;

      this.queryShou(this.queryParams);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryParams.page = val;
      this.queryShou(this.queryParams);
    },
  },
  created() {
    this.queryShou(this.queryParams);
  },
  mounted() {},
};
</script>
<style scoped>
.el-table .warning-row {
  background: pink;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>