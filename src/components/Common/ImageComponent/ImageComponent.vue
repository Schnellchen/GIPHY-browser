<template>
  <div class="root">
    <img
      :class="loaded ? 'image' : 'image-not-loaded'"
      @load="load"
      :src="src"
    />
    <Spinner v-if="!loaded" />
  </div>
</template>

<script>
import Spinner from "vue-simple-spinner";
export default {
  name: "ImageComponent",
  components: {
    Spinner
  },
  data() {
    const loaded = false;
    return { loaded };
  },
  props: {
    src: String
  },
  methods: {
    load() {
      this.loaded = true;
    }
  }
};
</script>

<style scoped>
.root {
  height: 150px;
  width: 150px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}
.image {
  height: 100%;
  width: 100%;
  border-radius: inherit;
}
.image-not-loaded {
  display: none;
}
</style>
