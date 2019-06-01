<template>
  <div class="imageShow">
    <div class="imageShow__area image">
      <div class="image__toggle">
        <h3 class="imageView">Origin Image</h3>
        <div v-if="file">/</div>
        <h3 class="imageView" v-if="file">Detected Image</h3>
      </div>
      <img class="image__display" :src="url||imageUrl">
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
      file: state => state.image.file || true,
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

  &__area,
  .image {
    flex: 3 1 0;
    display: flex;
    flex-flow: column nowrap;
    align-content: center;
    justify-content: center;

    &__toggle {
      margin: 4px;
      top: 2px;
      position: absolute;
      display: flex;
      font-weight: bold;
      font-size: 1.5rem;
      cursor: pointer;

      .imageView {
        margin: 1px;
        opacity: 0.8;
        transition: all 0.2s ease;

        &:hover {
          opacity: 1;
          transform: translate(-2px) scale(1.05);
          font-weight: bolder;
        }
      }
    }

    &__display {
      align-self: center;
      padding: 10px;
      max-height: 85%;
      width: auto;
    }
  }

  &__history {
    flex: 1 1 0;
  }
}
</style>
