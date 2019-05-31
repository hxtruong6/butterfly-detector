<template>
  <div class="imageShow">
    <div class="imageShow__area">
      <h3 class="imageShow__toggle">Origin Image</h3>
      <img class="imageShow__display" :src="url||imageUrl">
    </div>
    <div class="imageShow__history">Image story</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ImageShow",
  computed: {
    ...mapState({
      file: state => state.image.file,
      url: state => state.image.url
    }),
    imageUrl() {
      return "https://nature.mdc.mo.gov/sites/default/files/styles/centered_full/public/webform/2018/Common%20Buckeye-20181011-2222.jpeg";
    }
  },
  // data() {
  //   return {};
  // },
  methods: {
    getImgUrl(pic) {
      return require("~/assets/images/" + pic);
    }
  }
};
</script>

<style lang='scss' scoped>
.imageShow {
  background-color: $red-color-light;
  display: flex;
  flex-flow: column nowrap;
  flex: 2 1 0;

  &__image {
    flex: 3 1 0;
    max-width: 95%;
    max-height: 95%;
  }

  &__history {
    flex: 1 1 0;
  }
}
</style>
