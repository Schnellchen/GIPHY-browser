<template>
  <div @click="$emit('click-handle')" class="common-button">
    <p>Button</p>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "CommonButton"
});
</script>

<style scoped>
.common-button {
  min-width: 100px;
  max-width: 300px;
  height: 50px;
  width: 90%;
  border-radius: 10px;
  background-color: aquamarine;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0;
}
.common-button:hover {
  background-color: #42b983;
}
</style>
