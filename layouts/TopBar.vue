<template>
  <div class="topBar">
    <img
      class="topBar__logo"
      src="~assets/images/butterfly-icon.png"
      :width="width"
      :height="height"
    >
    <h1 class="topBar__header">{{header}}</h1>
  </div>
</template>

<script>
export default {
  name: "TopBar",
  data() {
    return {
      header: "Butterfly detector",
      width: "50",
      height: "50"
    };
  }
};
</script>

<style lang='scss' scoped>
@import "~assets/scss/main.scss";
.topBar {
  background-color: $primary-color-light;
  width: 100%;
  display: flex;
  padding: 4px;
  top: 0;

  &__logo {
    position: relative;
    left: 20px;
    padding: 3px;
  }

  &__header {
    margin: auto;
  }
}
</style>
