import { DataInterface } from "./../../decompose/dataFormation";
import { ItemsActionTypes } from "../../types/items";

export const setItems = (users: Array<DataInterface>) => ({
  type: ItemsActionTypes.SET_ITEMS,
  payload: users,
});

export const addItem = (data: DataInterface) => ({
  type: ItemsActionTypes.ADD_ITEM,
  payload: data,
});

export const removeItem = (flag: boolean) => ({
  type: ItemsActionTypes.REMOVE__ITEM,
  payload: flag,
});

export const removeSortedItem = (flag: any) => ({
  type: ItemsActionTypes.REMOVE__SORTED__ITEM,
  payload: flag,
});

export const updateItem = (id: number) => ({
  type: ItemsActionTypes.UPDATE__ITEM,
  payload: id,
});

export const filterItem = (data: DataInterface) => ({
  type: ItemsActionTypes.FILTER__ITEM,
  payload: data,
});

export const activePageManager = (id: number) => ({
  type: ItemsActionTypes.ACTIVE__ITEM,
  payload: id,
});
