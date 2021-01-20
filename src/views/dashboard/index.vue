<template>
  <div class="wrapper">
    <el-carousel :interval="4000" type="card" height="calc(100vh - 100px)">
      <el-carousel-item v-for="(img, index) in imgList" :key="index">
        <img v-bind:src="img.url" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgList: [
        { url: require("../../assets/dashimg/timg-13.jpg") },
        { url: require("../../assets/dashimg/timg14.jpg") },
        { url: require("../../assets/dashimg/timg.jpg") },
      ],
    };
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style scoped>
.el-carousel__item h3 {
  color: #fff;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #fff;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #fff;
}
img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
</style>