import axios from "axios";

export const getTrending = function(): Promise<[object]> {
  return axios
    .get(
      `${process.env.VUE_APP_BASE_URL}/trending?api_key=${process.env.VUE_APP_API_KEY}`
    )
    .then(result => result.data.data);
};

export const getSearched = function(query: string): Promise<[object]> {
  return axios
    .get(
      `${process.env.VUE_APP_BASE_URL}/search?api_key=${process.env.VUE_APP_API_KEY}&q=${query}`
    )
    .then(result => result.data.data);
};
