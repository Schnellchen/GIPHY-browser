<template>
  <div class="browser">
    <div class="browser__title">Giphy browser</div>
    <div class="header">
      <CommonInput
        @input-change="setSearchText"
        :value="searchText"
        class="header__input"
        @input-keydown="searchByEnter"
      />
      <CommonButton
        @click-handle="searchByButton"
        class="header__button"
        :disabled="searchText.length === 0"
      />
    </div>
    <div class="body">
      <div v-if="loading" class="loading-spinner">
        <LoadingSpinner />
      </div>
      <div class="error" v-else-if="data.length === 0">
        <div class="error__message">{{ error }}</div>
      </div>
      <div v-else class="content">
        <div v-for="(item, index) in data" :key="index">
          <a :href="item.url" target="_blank">
            <ImageComponent :src="item.images.original.url" :alt="item.title" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CommonInput from "../Common/CommonInput/CommonInput.vue";
import CommonButton from "../Common/CommonButton/CommonButton.vue";
import ImageComponent from "../Common/ImageComponent/ImageComponent.vue";
import LoadingSpinner from "../Common/LoadingSpinner/LoadingSpinner.vue";
import Vue from "vue";
import { getTrending, getSearched } from "@/service/giphy.service.ts";

export default Vue.extend({
  name: "Browser",
  components: {
    CommonButton,
    CommonInput,
    ImageComponent,
    LoadingSpinner
  },
  data() {
    const data: Array<object> = [{}];
    const searchText = "";
    const loading = true;
    const error = "";
    return { searchText, data, loading, error };
  },
  methods: {
    setSearchText(e: string) {
      this.searchText = e;
    },
    searchByEnter(e: string) {
      if (e === "Enter") {
        this.searchByButton();
      }
    },
    searchByButton() {
      this.loading = true;
      getSearched(this.searchText)
        .then((data: Array<object>) => {
          this.data = data;
          this.loading = false;
        })
        .then(() => {
          if (this.data.length === 0) {
            this.loading = false;
            this.error = "Your request has no result :(";
          }
        })
        .catch(() => {
          this.loading = false;
          this.data = [];
          this.error = "Can't connect to GIPHY";
        });
    }
  },
  mounted() {
    getTrending()
      .then((data: Array<object>) => {
        this.data = data;
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
        this.error = "Can't connect to GIPHY";
      });
  }
});
</script>

<style scoped>
.browser {
  min-width: 600px;
  max-width: 600px;
  display: grid;
  grid-gap: 30px;
}
.browser__title {
  font-size: 70px;
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
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.5);
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
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.5);
}
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
}
.error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  font-weight: 70;
  font-size: 40px;
}
.error__message {
  width: 70%;
  border-radius: 10px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.5);
  background-color: #c5edc1;
}
.content {
  margin: 20px 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
}
</style>
