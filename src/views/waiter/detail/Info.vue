<template>
  <div class="wrapper">
    <img :src="waiterBaseData.imgPhoto" class="image" />
    <!-- {{ waiterBaseData }}<br /> -->
    {{ waiterBaseData.realname }}<br />
    联系方式：{{ waiterBaseData.registerTime }} <br />
    状态：{{ waiterBaseData.status }}<br />
    地址：{{ waiterBaseData.province }}{{ waiterBaseData.city }}
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
    ...mapGetters("waiter", ["waiterBaseData"]),
  },
  methods: {
    ...mapActions("waiter", ["findWaiterById"]),
  },
  created() {
    this.findWaiterById({ id: this.id });
  },
  mounted() {},
};
</script>
<style scoped>
</style>