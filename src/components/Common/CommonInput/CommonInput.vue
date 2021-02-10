<template>
  <input
    :value="value"
    @input="$emit('input-change', $event.target.value.trim())"
    @keydown.enter="$emit('input-keydown-enter')"
    class="common-input"
    type="text"
    :placeholder="placeholder"
  />
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "CommonInput",
  props: {
    value: String,
    placeholder: String
  }
});
</script>
<style scoped>
.common-input {
  font-size: inherit;
  border-radius: 5px;
  box-shadow: none;
  border: none;
  width: 100%;
  height: 50px;
  max-width: 100%;
  min-width: 40%;
}
.common-input:focus {
  outline: none;
}
</style>
