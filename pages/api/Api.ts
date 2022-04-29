import { DataInterface } from "../../decompose/dataFormation";
import axios from "axios";

export const Api = {
  deleteCard(urlItems: string, currId: string, currUser: Array<DataInterface>) {
    return axios({
      method: "DELETE",
      url: `${urlItems}/${currId}`,
      data: JSON.stringify(currUser),
      headers: {
        "Content-type": "application/json",
      },
    });
  },
};
