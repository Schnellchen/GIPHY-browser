<template>
  <div class="browser">
    <div class="browser__title">Giphy browser</div>
    <div class="header">
      <CommonInput
        @input-change="setSearchText"
        :value="searchText"
        class="header__input"
      />
      <CommonButton @click-handle="search" class="header__button" />
    </div>
    <div class="body">
      <div v-if="loading" class="loading-spinner">
        <Spinner size="100" line-fg-color="aquamarine" />
      </div>
      <div v-else class="content">
        <img
          class="image"
          v-for="(item, index) in data"
          :src="item.images.original.url"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CommonInput from "../Common/CommonInput/CommonInput.vue";
import CommonButton from "../Common/CommonButton/CommonButton.vue";
import Spinner from "vue-simple-spinner";
import Vue from "vue";
import { getSearched } from "@/service/giphy.service.js";

export default Vue.extend({
  name: "Browser",
  components: {
    CommonButton,
    CommonInput,
    Spinner
  },
  data() {
    const searchText = "";
    const data = [];
    const loading = false;
    return { searchText, data, loading };
  },
  methods: {
    setSearchText(e) {
      this.searchText = e;
    },
    search() {
      this.loading = true;
      getSearched(this.searchText).then(data => {
        this.data = data;
        this.loading = false;
      });
    }
  },
  mounted() {
    //getTrending().then(data => (this.data = data));
  }
});
</script>

<style scoped>
.browser {
  min-width: 500px;
  max-width: 1000px;
  display: grid;
  grid-gap: 30px;
}
.browser__title {
  font-size: 100px;
  font-weight: 70;
  text-align: center;
  color: rgba(0, 0, 0, 0.15);
}
.header {
  display: flex;
  background-color: #c5edd6;
  justify-content: space-around;
  min-width: 1px;
  align-items: center;
  height: 100px;
  border-radius: 10px;
}
.header__input {
  width: 65%;
}
.header__button {
  width: 25%;
}
.body {
  background-color: #c5edd6;
  min-height: 500px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
}
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
}
.content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
}
.image {
  height: 150px;
  width: 150px;
  background-color: #42b983;
}
</style>
