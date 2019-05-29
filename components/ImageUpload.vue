<template>
  <div class="imageUpload">
    <div class="imageUpload__dropArea dropArea">
      <h2 class="dropArea__title">Upload your image</h2>
      <p class="dropArea__info">You can upload/drop a photo or paste a URL of an image</p>
      <div class="dropArea__icon">
        <img :src="getImgUrl(uploadIcon)" title="Upload/drop image">
      </div>
    </div>
    <div class="imageUpload___pasteLink pastelink">
      <h3 class="pastelink__title">Paste URL</h3>
      <input
        class="pastelink__input"
        type="text"
        placeholder="www.common-buckeye.jpg"
        title="URL image"
      >
    </div>
    <button class="imageUpload__btn">Upload</button>
  </div>
</template>

<script>
export default {
  name: "ImageUpload",
  data() {
    return {
      uploadIcon: "image-upload.png"
    };
  },
  methods: {
    getImgUrl(pic) {
      return require("~/assets/images/" + pic);
    }
  }
};
</script>

<style lang='scss' scoped>
.imageUpload {
  background-color: $secondary-color;
  display: flex;
  justify-content: space-around;
  flex-flow: column nowrap;
  flex: 1 1 0;
  transition: all 0.2s ease-in-out;

  &__dropArea {
  }

  .dropArea {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__title {
      font-weight: bold;
    }
    &__info {
    }
    &__icon {
      width: max-content;
      height: max-content;
      border: 1px dashed;
      padding: 25px;

      &:hover {
        border: 2px dashed;
        padding: 26px;
      }
    }
  }

  .pastelink {
    margin: 0% 2%;
    &__title {
      font-weight: bold;
    }
    &__input {
      width: 100%;
    }
  }

  &__btn {
    width: 50%;
    align-self: center;
    text-transform: uppercase;
    background: $white-color;
    padding: 10px;
    border: 2px solid $red-color-light;
    display: inline-block;
    font-weight: bold;

    &:hover {
      transform: translateY(-2px) scale(1.15);
      box-shadow: 0px 2px 20px -5px rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
