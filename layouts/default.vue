<template>
  <div id="app">
    <top-bar/>
    <nuxt/>
  </div>
</template>

<script>
import TopBar from "~/components/TopBar.vue";
export default {
  components: {
    TopBar
  }
};
</script>
 
<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
