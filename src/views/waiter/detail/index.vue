<template>
  <div class="wrapper">
    <el-button type="text" @click="toBack">返回</el-button>
    <!-- 标签页 -->
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="info" :lazy="true">
          <Info />
        </el-tab-pane>
        <el-tab-pane label="订单详情" name="second" :lazy="true">
          <Order />
        </el-tab-pane>
        <el-tab-pane label="收益信息" name="third" :lazy="true">
          <Earnings></Earnings>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Info from "./Info";
import Order from "./Order";
import Earnings from "./earnings";
export default {
  components: {
    Info,
    Order,
    Earnings,
  },
  data() {
    return {
      //激活的选项卡
      activeName: "info",
    };
  },
  computed: {},
  methods: {
    toBack() {
      this.$router.go(-1);
    },
  },
  created() {
    //获取动态路由参数
    console.log(this.$route.params.id);
  },
  mounted() {},
};
</script>
<style scoped>
</style>