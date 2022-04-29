import { DataInterface } from "./../../decompose/dataFormation";
import axios from "axios";

export const CreateApi = {
  setCard(urlItems: string, data: DataInterface) {
    return axios({
      method: "POST",
      url: urlItems,
      data: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });
  },
};
