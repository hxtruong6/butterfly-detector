<template>
  <div class="imageUpload">
    <div class="imageUpload__dropArea dropArea">
      <h2 class="dropArea__title">Upload your image</h2>
      <p class="dropArea__info">You can upload/drop a photo or paste a URL of an image</p>
    </div>
    <input
      class="dropArea__input"
      type="file"
      @change="onFileChanged"
      accept="image/*"
      name="file"
      id="file"
    >
    <label class="dropArea__label dropArea__label--border" for="file">
      <img :src="getImgUrl(uploadIcon)" title="Upload/drop image">
      <br>
      <h2>Choose a file</h2>
    </label>
    <div class="imageUpload___pasteLink pastelink">
      <h2 class="pastelink__title">Paste URL</h2>
      <input
        class="pastelink__input"
        type="text"
        placeholder="www.common-buckeye.jpg"
        title="URL image"
        @change="onPasteLink"
      >
    </div>
    <button class="imageUpload__btn" :disabled="disableDetectBtn" @click="onDetect">Detect</button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ImageUpload",
  computed: {
    ...mapState({
      url: state => state.image.url,
      detectedUrl: state => state.image.detectedUrl
    })
  },
  data() {
    return {
      uploadIcon: "image-upload.png",
      disableDetectBtn: true
    };
  },
  methods: {
    getImgUrl(pic) {
      return require("~/assets/images/" + pic);
    },
    onFileChanged(event) {
      const originImage = event.target.files[0];
      this.uploadIcon = "image-uploaded.png";
      this.$store.commit("image/onFileChanged", originImage);
      this.disableDetectBtn = false;
    },
    onPasteLink(event) {
      const link = event.target.value;
      this.$store.commit("image/onFileChanged", link);
    },
    async onDetect() {
      await this.$store.commit("image/onDetect");
      this.uploadIcon = "image-upload.png";
      this.disableDetectBtn = true;
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
  transition: all 0.2s ease;

  font-size: 1.4rem;

  &__dropArea {
  }

  .dropArea {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    &__title {
      font-weight: bold;
    }
    &__info {
    }

    &__input {
      width: 0.1px;
      height: 0.1px;
      opacity: 0;
      overflow: hidden;
      position: absolute;
      z-index: -1;
    }
    &__input + label {
      font-size: 1.3rem;
      font-weight: bold;
      // color: white;
      // display: inline-block;
      cursor: pointer;

      opacity: 0.7;
    }

    &__input:focus + label,
    &__input + label:hover {
      opacity: 1;
      font-weight: bolder;
      font-size: 1.4rem;
    }

    &__label {
      margin: 5px;
      padding: 5px;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      align-content: space-around;
      justify-content: space-around;

      &--border {
        border-top: 2px solid $primary-color-light;
        border-bottom: 2px solid $red-color-light;
        background-image: linear-gradient(
            $primary-color-light,
            $red-color-light
          ),
          linear-gradient($primary-color-light, $red-color-light);
        background-size: 2px 100%;
        background-position: 0 0, 100% 0;
        background-repeat: no-repeat;
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
      transform: translateY(-2px) scale(1.1);
      box-shadow: 0px 2px 20px -5px rgba(0, 0, 0, 0.5);
    }

    &:disabled {
      opacity: 0.6;
      transform: scale(0.95);
    }
  }
}
</style>
