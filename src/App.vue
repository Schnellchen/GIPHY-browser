<template>
  <div id="app">
    <Browser />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Browser from "./components/Containers/Browser.vue";
export default Vue.extend({
  name: "App",
  components: {
    Browser
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 14pt;
  display: flex;
  justify-content: center;
}
</style>
