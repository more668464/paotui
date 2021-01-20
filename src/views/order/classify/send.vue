<template>
  <div>
    <!-- 表格 -->
    <div>
      <el-table
        :data="sendData"
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
            <el-button @click="toSend(scope.row)" type="text" size="small"
              >派单</el-button
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
          :total="sendTotal"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 模态框 -->
    <el-dialog title="派单" :visible.sync="visible">
      <el-form :model="form">
        <el-form-item label="选择员工：">
          <el-radio-group
            v-model="waiterId"
            v-for="item in waiterAllData"
            :key="item.id"
            :value="item.id"
          >
            <el-radio :label="item.id">{{ item.username }}</el-radio
            ><br />
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="toSave()">确 定</el-button>
      </div>
    </el-dialog>
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
        status: "待派单",
      },
      visible: false,
      formLabelWidth: "180px",
      form: {},
      waiterId: null,
      orderId: 1,
    };
  },
  computed: {
    ...mapGetters("order", ["sendTotal", "sendData"]),
    ...mapGetters("waiter", ["waiterAllData"]),
  },
  methods: {
    ...mapActions("order", ["queryPage", "sendOrder"]),
    ...mapActions("waiter", ["findAllData"]),

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
    toDetail(val) {
      this.$router.push(`/orderDetail/${row.id}/index`);
    },
    //派单
    toSend(row) {
      console.log(row);
      this.orderId = row.id;
      this.visible = true;
    },
    //确认派单
    toSave() {
      this.sendOrder({
        waiterId: this.waiterId,
        orderId: this.orderId,
      }).then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.$message({
            message: "派单成功",
            type: "success",
          });
          this.queryPage(this.queryParams);
        } else {
          this.$message({
            type: "error",
            message: "该员工不可派单",
          });
        }
      });
      this.visible = false;
    },
  },
  created() {
    this.queryPage(this.queryParams);
    this.findAllData();
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>