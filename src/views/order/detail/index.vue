<template>
  <div class="wrapper">
    <el-button type="text" @click="toBack">返回</el-button>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>订单详情</span>
        </div>
        <div>
          订单编号：{{ orderByIdData.id }} <br />
          下单时间：{{ orderByIdData.orderTime }} <br />
          订单状态：{{ orderByIdData.status }} <br />
          员工编号：{{ orderByIdData.waiterId }} <br />
          顾客：{{ orderByIdData.customer.realname }} <br />
          顾客手机号：{{ orderByIdData.customer.telephone }} <br />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  computed: {
    ...mapGetters("order", ["orderByIdData"]),
  },
  methods: {
    ...mapActions("order", ["findById"]),
    toBack() {
      this.$router.go(-1);
    },
  },
  created() {
    this.findById(this.id);
  },
  mounted() {},
};
</script>
<style scoped>
</style>