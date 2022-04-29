import axios from "axios";

export const SearchApi = {
  getCard(url: string) {
    return axios({
      method: "GET",
      url: url,
      headers: {
        "Content-type": "application/json",
      },
    });
  },

  getCards(urlItems: string) {
    return axios({
      method: "GET",
      url: urlItems,
      headers: {
        "Content-type": "application/json",
      },
    });
  },
};
