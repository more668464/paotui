<template>
  <div class="wrapper">
    <img :src="customerBaseData.imgPhoto" class="image" /><br />
    <!-- {{ customerBaseData }}<br /> -->
    姓名：{{ customerBaseData.realname }}<br />
    联系方式：{{ customerBaseData.registerTime }} <br />
    状态：{{ customerBaseData.status }}<br />
    地址：{{ customerBaseData.province }}{{ customerBaseData.city }}
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
    ...mapGetters("customer", ["customerBaseData"]),
  },
  methods: {
    ...mapActions("customer", ["findCustomerById"]),
  },
  created() {
    this.findCustomerById({ id: this.id });
  },
  mounted() {},
};
</script>
<style scoped>
</style>