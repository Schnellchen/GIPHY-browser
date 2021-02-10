<template>
  <div class="root">
    <a :href="url" target="_blank" :class="!loaded && 'not-loaded'">
      <img class="image" @load="onLoad" :src="src" :alt="alt" />
    </a>
    <LoadingSpinner v-if="!loaded" />
  </div>
</template>

<script>
import LoadingSpinner from "../../Common/LoadingSpinner/LoadingSpinner.vue";
export default {
  name: "ImageComponent",
  components: {
    LoadingSpinner
  },
  props: {
    src: String,
    alt: String,
    url: String
  },
  data() {
    const loaded = false;
    return { loaded };
  },
  methods: {
    onLoad() {
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
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.5);
}
.root a {
  height: 100%;
  width: 100%;
}
.image {
  height: 100%;
  width: 100%;
  border-radius: 10px;
}
.not-loaded {
  display: none;
}
</style>
