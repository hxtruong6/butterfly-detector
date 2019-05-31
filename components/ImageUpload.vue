<template>
  <div class="imageUpload">
    <div class="imageUpload__dropArea dropArea">
      <h2 class="dropArea__title">Upload your image</h2>
      <p class="dropArea__info">You can upload/drop a photo or paste a URL of an image</p>
      <div class="dropArea__input">
        <img class="dropArea__input--icon" :src="getImgUrl(uploadIcon)" title="Upload/drop image">
        <input type="file" @change="onFileChanged" accept="image/*" class="dropArea__input--file">
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
    <button class="imageUpload__btn" @click="onDetect">Detect</button>
  </div>
</template>

<script>
// const STATUS_INITIAL = 0,
//   STATUS_SAVING = 1,
//   STATUS_SUCCESS = 2,
//   STATUS_FAILED = 3;

export default {
  name: "ImageUpload",
  data() {
    return {
      uploadIcon: "image-upload.png",
      selectedFile: null,
      url: null
    };
  },
  methods: {
    getImgUrl(pic) {
      return require("~/assets/images/" + pic);
    },
    onFileChanged(event) {
      console.log("xxx 000 onFileChanged: ", event.target.files);
      this.selectedFile = event.target.files[0];
      const url = URL.createObjectURL(this.selectedFile);
      console.log("xxx 004 url: ", url);
      this.$store.commit("image/onFileChanged", url);
    },
    onDetect() {
      // upload file
      console.log("xxx 001 upload file: ", this.selectedFile);
      // this.$store.commit("uploadFile", this.selectedFile);
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
    &__input {
      width: max-content;
      height: max-content;
      border: 1px dashed;
      padding: 25px;
      opacity: 0.7;
      &:hover {
        // border: 2px dashed;
        // padding: 26px;
        opacity: 1;
      }

      &--file {
        opacity: 1; /* invisible but it's there! */
        width: 100%;
        cursor: pointer;
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
