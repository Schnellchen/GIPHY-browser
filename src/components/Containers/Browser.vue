<template>
  <div class="browser">
    <div class="browser__title">GIPHY browser</div>
    <div class="header">
      <CommonInput
        @input-change="setSearchText"
        :value="searchText"
        placeholder="Search"
        class="header__input"
        @input-keydown-enter="search"
      />
      <CommonButton
        @click-handle="search"
        class="header__button"
        :disabled="searchText.length === 0"
        title="Go!"
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
        <div class="images">
          <div
            v-for="(item, index) in data.slice(position, position + 6)"
            :key="index + position"
          >
            <ImageComponent
              :src="item.images.original.url"
              :alt="item.title"
              :url="item.url"
            />
          </div>
        </div>
        <div class="content__controls">
          <CommonButton
            class="content__button"
            @click-handle="previousPage"
            title="Previous"
            :disabled="this.position === 0"
          />
          <div class="content__range">
            {{ getContentRange }}
          </div>
          <CommonButton
            class="content__button"
            @click-handle="nextPage"
            title="Next"
            :disabled="this.data.length - this.position <= 6"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CommonInput from "../Common/CommonInput/CommonInput.vue";
import CommonButton from "../Common/CommonButton/CommonButton.vue";
import ImageComponent from "../Common/ImageComponent/ImageComponent.vue";
import LoadingSpinner from "../Common/LoadingSpinner/LoadingSpinner.vue";
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
    const data: Array<object> = [];
    const searchText = "";
    const loading = true;
    const error = "";
    const position = 0;
    return { searchText, data, loading, error, position };
  },
  methods: {
    setSearchText(e: string) {
      this.searchText = e;
    },
    search() {
      this.loading = true;
      getSearched(this.searchText)
        .then((data: Array<object>) => {
          this.data = data;
          this.loading = false;
          this.position = 0;
        })
        .then(() => {
          if (this.data.length === 0) {
            this.loading = false;
            this.position = 0;
            this.error = "Your request has no result :(";
          }
        })
        .catch(() => {
          this.loading = false;
          this.position = 0;
          this.data = [];
          this.error = "Can't connect to GIPHY";
        });
    },
    previousPage() {
      this.position = this.position - 6;
    },
    nextPage() {
      this.position = this.position + 6;
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
  },
  computed: {
    getContentRange: function(): string {
      return `${this.position + 1} - ${
        this.position + 6 > this.data.length
          ? this.data.length
          : this.position + 6
      }`;
    }
  }
});
</script>

<style scoped>
.browser {
  min-width: 600px;
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
  height: 100%;
  display: grid;
  grid-template-rows: 4fr 1fr;
  align-items: center;
}
.images {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
}
.content__controls {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
  max-height: 50px;
}
.content__range {
  width: 60px;
  height: auto;
  box-shadow: inset 2px 2px 5px rgba(154, 147, 140, 0.5);
  justify-self: center;
  text-align: center;
  border-radius: 8px;
  color: rgba(0, 0, 0, 0.7);
}
.content__button {
  justify-self: center;
}
@media screen and (max-width: 450px) {
  .browser {
    min-width: 320px;
  }
  .images {
    grid-template-columns: 1fr 1fr;
  }
  .browser__title {
    font-size: 35px;
  }
}
@media screen and (max-width: 320px) {
  .browser {
    min-width: 250px;
  }
  .images {
    grid-template-columns: none;
    justify-content: center;
  }
  .browser__title {
    font-size: 35px;
  }
}
</style>
