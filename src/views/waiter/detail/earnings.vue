<template>
  <div class="wrapper">
    <div>
      <el-table
        :data="tempData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        height="calc(100vh - 220px)"
      >
        <el-table-column prop="id" label="订单编号" width="180">
        </el-table-column>
        <el-table-column prop="money" label="金额" width="180">
        </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column prop="userId" label="客户id"> </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="toDetail(scope.row)" type="text" size="small"
              >提现</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        :current-page.sync="page"
        :page-sizes="[2, 5, 10, 15]"
        :page-size.sync="pageSize"
        layout="sizes, prev, pager, next"
        :total="detailsShouData.length"
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
    };
  },
  computed: {
    ...mapGetters("waiter", ["detailsShouData"]),
    tempData() {
      return this.detailsShouData.slice(
        (this.page - 1) * this.pageSize,
        this.page * this.pageSize
      );
    },
  },
  methods: {
    ...mapActions("waiter", ["detailsShou"]),
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    toDetail() {},
  },
  created() {
    this.detailsShou({ id: this.id });
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