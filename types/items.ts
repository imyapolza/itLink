import { DataInterface } from "./../decompose/dataFormation";
import { TechnicalInterface } from "../decompose/dataFormation";

export interface UserInterface {
  activePage: number;
  items: Array<DataInterface>;
  sortedItems?: Array<DataInterface>;
}

export interface ItemsState {
  users: UserInterface;
  count?: number;
  activePage?: number;
}

export interface ItemInterface {
  img: string | undefined;
  id: string;
  technical_characteristics: TechnicalInterface;
  body: string;
  brand: string;
  mileage: string;
  model: string;
  price: string;
  year: string;
}


export enum ItemsActionTypes {
  SET_ITEMS = "SET_ITEMS",
  ADD_ITEM = "ADD_ITEM",
  REMOVE__ITEM = "REMOVE__ITEM",
  FILTER__ITEM = "FILTER__ITEM",
  UPDATE__ITEM = "UPDATE__ITEM",
  ACTIVE__ITEM = "ACTIVE__ITEM",
  REMOVE__SORTED__ITEM = "REMOVE__SORTED__ITEM",
  ADD__FILTERED__ITEMS = "ADD__FILTERED__ITEMS"
}

interface SetItemsAction {
  type: ItemsActionTypes.SET_ITEMS;
  payload: Array<ItemInterface>;
}
interface AddItemAction {
  type: ItemsActionTypes.ADD_ITEM;
  payload: DataInterface;
}
interface RemoveItemAction {
  type: ItemsActionTypes.REMOVE__ITEM;
  payload: number;
}

interface UpdateItemAction {
  type: ItemsActionTypes.UPDATE__ITEM;
  payload: number;
}

interface FilterItemAction {
  type: ItemsActionTypes.FILTER__ITEM;
  payload: DataInterface;
}

interface RemoveSortedItemAction {
  type: ItemsActionTypes.REMOVE__SORTED__ITEM;
  payload: DataInterface;
}

export type ItemAction =
  | SetItemsAction
  | AddItemAction
  | RemoveItemAction
  | FilterItemAction
  | UpdateItemAction
  | RemoveSortedItemAction;
