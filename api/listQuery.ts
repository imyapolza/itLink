import React from "react";
import { urlItems } from "../consts/urlItems";
import { DataInterface } from "../decompose/dataFormation";

export const listQuery = (param: string | undefined, data: DataInterface) => {
  const axios = require("axios").default;

  console.log("data в listQuery", "param", param);

  return axios.put(`${urlItems}/${param}`, JSON.stringify(data), {
    headers: {
      "Content-type": "application/json",
    },
  });
};
