<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="所有订单" name="allOrder"
        ><allOrder></allOrder
      ></el-tab-pane>
      <el-tab-pane label="待支付" name="paid">
        <paid></paid>
      </el-tab-pane>
      <el-tab-pane label="待派单" name="send"><send></send></el-tab-pane>
      <el-tab-pane label="待接单" name="receive"
        ><receive></receive
      ></el-tab-pane>
      <el-tab-pane label="待服务" name="service"
        ><service></service
      ></el-tab-pane>
      <el-tab-pane label="待确认" name="confirm"
        ><confirm></confirm
      ></el-tab-pane>
      <el-tab-pane label="已完成" name="accomplish"
        ><accomplish></accomplish
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import allOrder from "./classify/allOrder";
import paid from "./classify/paid";
import send from "./classify/send";
import receive from "./classify/receive";
import service from "./classify/service";
import confirm from "./classify/confirm";
import accomplish from "./classify/accomplish";
export default {
  components: {
    allOrder,
    paid,
    send,
    receive,
    service,
    confirm,
    accomplish,
  },
  data() {
    return {
      activeName: "allOrder",
    };
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>