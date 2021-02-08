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
      <div>Giphochki</div>
    </div>
  </div>
</template>

<script>
import CommonInput from "../Common/CommonInput/CommonInput";
import CommonButton from "../Common/CommonButton/CommonButton";
import Vue from "vue";

export default Vue.extend({
  name: "Browser",
  components: {
    CommonButton,
    CommonInput
  },
  data() {
    const searchText = "";
    return { searchText };
  },
  methods: {
    setSearchText(e) {
      this.searchText = e;
    },
    search() {
      console.log(this.searchText);
    }
  }
});
</script>

<style scoped>
.browser {
  min-width: 600px;
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
}
</style>
