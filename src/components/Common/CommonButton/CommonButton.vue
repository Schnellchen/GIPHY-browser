<template>
  <div
    @click="!disabled && $emit('click-handle')"
    :class="
      disabled
        ? 'common-button common-button_disabled'
        : 'common-button common-button_active'
    "
  >
    {{ title }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "CommonButton",
  props: {
    title: String,
    disabled: Boolean
  }
});
</script>

<style scoped>
.common-button {
  min-width: 100px;
  max-width: 300px;
  height: 50px;
  width: 90%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}
.common-button_active {
  background-color: aquamarine;
  cursor: pointer;
}
.common-button_active:hover {
  background-color: #42b983;
}
.common-button_disabled {
  cursor: default;
  background-color: rgba(0, 0, 0, 0.15);
}
</style>
