import React, { SyntheticEvent, useState } from "react";
import { OptionInterface } from "../components/OtherForm/OtherForm";

export interface OptionNameInterface {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

export interface TechnicalInterface {
  body: string;
  brand: string;
  mileage: string;
  model: string;
  productionYear: string;
  car__id?: string;
}

export interface DataInterface {
  [x: string]: any;
  contacts?: string;
  description?: string;
  id?: string;
  name?: string;
  img?: string;
  image?: any;
  price?: string;
  technical_characteristics?: TechnicalInterface;
  options?: any[];
  brand?: string;
  model?: string;
  productionYear?: string;
  body?: string;
  mileage?: string;
}

export const dataFormation = (
  data: DataInterface,
  form: boolean,
  options: Array<OptionInterface>,
  newId: string
) => {
  data["id"] = newId;

  if (form) {
    data["technical_characteristics"] = {
      car__id: Math.random().toString(16).slice(2),
      brand: data.brand!,
      model: data.model!,
      productionYear: data.productionYear!,
      body: data.body!,
      mileage: data.mileage!,
    };
  } else {
    delete data.technical_characteristics;
  }

  delete data.car__id;
  delete data.brand;
  delete data.model;
  delete data.productionYear;
  delete data.body;
  delete data.mileage;

  data["options"] = Object.create({});
  console.log("optionss", options);

  function optionNameGen(len: number) {
    const chrs = "abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789";
    let str = "";
    for (let i = 0; i < len; i++) {
      const pos = Math.floor(Math.random() * chrs.length);
      str += chrs.substring(pos, pos + 1);
    }
    return str;
  }

  options &&
    options.map((option, index) => {
      // @ts-ignore
      data.options[optionNameGen(8)] = option.name;
    });

  for (let key in data.options) {
    // @ts-ignore
    if (data.options[key] === "") {
      // @ts-ignore
      delete data.options[key];
    }
  }
  // @ts-ignore
  if (Object.keys(data["options"]).length == 0) {
    delete data["options"];
  }

  return data;
};
