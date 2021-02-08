import axios from "axios";

export const getTrending = async function() {
  return axios
    .get(
      `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.VUE_APP_API_KEY}`
    )
    .then(result => result.data.data);
};

export const getSearched = function(query) {
  return axios
    .get(
      `https://api.giphy.com/v1/gifs/search?api_key=${process.env.VUE_APP_API_KEY}&q=${query}`
    )
    .then(result => result.data.data);
};
