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
        <div v-for="(item, index) in data" :key="index">
          <a :href="item.url" target="_blank">
            <ImageComponent :src="item.images.original.url" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonInput from "../Common/CommonInput/CommonInput.vue";
import CommonButton from "../Common/CommonButton/CommonButton.vue";
import ImageComponent from "../Common/ImageComponent/ImageComponent.vue";
import Spinner from "vue-simple-spinner";
import Vue from "vue";
import { getTrending, getSearched } from "@/service/giphy.service.js";

export default Vue.extend({
  name: "Browser",
  components: {
    CommonButton,
    CommonInput,
    Spinner,
    ImageComponent
  },
  data() {
    const searchText = "";
    const data = [];
    const loading = true;
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
    getTrending().then(data => {
      this.data = data;
      this.loading = false;
    });
  }
});
</script>

<style scoped>
.browser {
  min-width: 400px;
  max-width: 600px;
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
  margin: 20px 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
}
</style>
