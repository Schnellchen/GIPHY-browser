import axios from "axios";

export const getTrending = async function(): Promise<[object]> {
  const {
    data: { data }
  } = await axios.get(
    `${process.env.VUE_APP_BASE_URL}/trending?api_key=${process.env.VUE_APP_API_KEY}`
  );
  return data;
};

export const getSearched = async function(query: string): Promise<[object]> {
  const {
    data: { data }
  } = await axios.get(
    `${process.env.VUE_APP_BASE_URL}/search?api_key=${process.env.VUE_APP_API_KEY}&q=${query}`
  );
  return data;
};
