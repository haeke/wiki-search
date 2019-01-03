import axios from "axios";

export const getSearch = event => {
  return axios.get(
    `https://en.wikipedia.org/w/api.php?action=query&origin=*&list=search&srsearch=${event}&prop=info&inprop=url&utf8=&format=json`
  );
};
