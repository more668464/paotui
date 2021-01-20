<template>
  <div class="wrapper">
    <el-button type="text" @click="toBack">返回</el-button>

    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ productIdData.name }}</span>
        </div>
        <div>
          产品价格：{{ productIdData.price }} <br />
          产品描述：{{ productIdData.price }} <br />
          产品主图：<img :src="productIdData.photo" class="image" />
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
    ...mapGetters("product", ["productIdData"]),
  },
  methods: {
    ...mapActions("product", ["findById"]),
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