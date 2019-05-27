<template>
  <div class="mainLayout">
    <!-- <TopBar class="mainLayout__topBar"></TopBar> -->
    <div class="mainLayout__content">
      <!-- <ImageUpload></ImageUpload>
      <ImageShow></ImageShow>
      <ImageInfo></ImageInfo>-->
    </div>
  </div>
</template>

<script>
// import TopBar from "./TopBar.vue";
// import ImageUpload from "../ImageUpload.vue";
// import ImageShow from "../ImageShow.vue";
// import ImageInfo from "../ImageInfo.vue";

export default {
  name: "MainLayout",
  components: {
    // TopBar,
    // ImageUpload,
    // ImageShow,
    // ImageInfo
  },
  data() {
    return {};
  }
};
</script>

<style lang='scss' scoped >
.mainLayout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  &__topBar {
  }

  &__content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
  }
}
</style>
