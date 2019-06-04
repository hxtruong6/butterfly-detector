<template>
  <div class="imageInfo">{{currResult}}
    <!-- <div class="imageInfo__name">Name: {{name}}</div>
    <div class="imageInfo__time">Predicted in: {{second}} seconds</div>
    <div class="imageInfo__confidence">Confidence: {{confidence}}</div>
    <div class="imageInfo__description">Description: {{description}}</div>
    <a class="imageInfo__link" :href="butterfly.link">Detail more...</a>-->
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ImageInfo",
  computed: {
    ...mapState({
      result:
        // {
        //   get:
        state => state.image.result
      // set: newResult => {
      //   console.log("xxx 202 newResult: ", newResult);
      //   return newResult;
      // }
      // }
    })
  },
  data() {
    return {
      currResult: this.result || "No any image for detecting!!!"
    };
  },
  watch: {
    result: function(val) {
      console.log("xxx result change: ", val);
      this.currResult = val;
    }
  }
};
</script>

<style lang='scss' scoped>
.imageInfo {
  flex: 1.5 1 0;
  background-color: $third-color-light;
  font-size: 1.5rem;
}
</style>
