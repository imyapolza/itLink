import { AnyAction } from "redux";
import { DataInterface } from "./../../decompose/dataFormation";
import { ItemsActionTypes, UserInterface } from "../../types/items";

const initialState = {
  items: [],
  activePage: 1,
  sortedItems: [],
};

export const items = (
  state: UserInterface = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case ItemsActionTypes.SET_ITEMS:
      return { ...state, items: action.payload };

    case ItemsActionTypes.ADD_ITEM:
      const newItems = [];
      state.items.map((item) => newItems.push(item));

      const newUser = action.payload;
      newUser.id = newItems.length + 1;
      newItems.push(newUser);

      return { ...state, items: newItems };

    case ItemsActionTypes.REMOVE__ITEM:
      const newUsers = state.items.filter(
        (item) => Number(action.payload) !== Number(item.id)
      );

      return { ...state, items: newUsers };

    case ItemsActionTypes.REMOVE__SORTED__ITEM:
      console.log("экшнпайлоад", action.payload);
      const newSortedItems = state.sortedItems?.filter((item) => {
        console.log(
          "reduxitem",
          item,
          "item.id",
          item.id,
          "action.payload",
          action.payload,
          Number(item.id) !== Number(action.payload)
        );
        return Number(item.id) !== Number(action.payload);
      });

      console.log("newSortedItems", newSortedItems);

      return { ...state, sortedItems: newSortedItems };

    case ItemsActionTypes.REMOVE__SORTED__ITEM:
      const newSortedUsers = state.sortedItems && state.sortedItems.slice(0);

      newSortedUsers!.shift();

      return { ...state, sortedItems: newSortedUsers };

    case ItemsActionTypes.FILTER__ITEM:
      const data = action.payload;
      console.log("data", data);

      for (let key in data) {
        console.log("keydat", data[key]);
        data[key] = data[key].trim();
      }

      const cards = [];

      if (
        data.brand.length > 0 ||
        data.model.length > 0 ||
        data.productionYear.length > 0 ||
        data.body.length > 0 ||
        data.mileage_from.length > 0 ||
        data.mileage_to.length > 0
      ) {
        const newCards = state.items?.filter((item) =>
          item.hasOwnProperty("technical_characteristics")
        );

        cards.push(...newCards);
      } else {
        cards.push(...state.items);
      }

      const filteredName = cards.filter((user) => {
        return user.name && user.name.includes(data.name);
      });
      console.log("filteredName до", filteredName);

      console.log("filteredName", filteredName);

      const filteredContacts = filteredName.filter(
        (user) => user.contacts && user.contacts.includes(data.contacts)
      );

      console.log("filteredContacts", filteredContacts);

      const filteredPriceFrom = filteredContacts.filter(
        (item: DataInterface) => {
          return Number(item.price) >= Number(data.price_from);
        }
      );

      console.log("filteredPriceFrom", filteredPriceFrom);

      const filteredPriceTo = filteredPriceFrom.filter((item) => {
        console.log(
          "item.price",
          item.price,
          "data.price_to",
          data.price_to,
          Number(item.price) <= Number(data.price_to)
        );
        return Number(item.price) <= Number(data.price_to);
      });

      console.log("filteredPriceTo", filteredPriceTo);

      if (data.price_to === "") {
        if (filteredPriceTo.length === 0) {
          filteredPriceFrom.map((item) => filteredPriceTo.push(item));
        }
      }

      const filteredBrand = filteredPriceTo.filter((user) => {
        return user.technical_characteristics
          ? user.technical_characteristics.brand.includes(data.brand)
          : user.hasOwnProperty("name");
      });
      console.log("filteredBrand", filteredBrand);

      if (filteredBrand.length === 0) {
        filteredBrand.push(filteredPriceTo);
      }

      const filteredModel = filteredBrand.filter((user) => {
        return user.technical_characteristics
          ? user.technical_characteristics.model.includes(data.model)
            ? true
            : null
          : user.hasOwnProperty("id");
      });

      console.log("filteredModel", filteredModel);

      if (filteredModel.length === 0) {
        filteredModel.push(filteredBrand);
      }

      const filteredYear = filteredModel.filter((user) =>
        user.technical_characteristics
          ? user.technical_characteristics.productionYear.includes(
              data.productionYear
            )
            ? true
            : null
          : user.hasOwnProperty("id")
      );

      console.log("filteredYear", filteredYear);

      if (filteredYear.length === 0) {
        filteredYear.push(filteredModel);
      }

      const filteredBody = filteredYear.filter((user) => {
        return user.technical_characteristics &&
          user.technical_characteristics.body
          ? user.technical_characteristics.body.includes(data.body)
            ? true
            : null
          : user.hasOwnProperty("id");
      });

      console.log("filteredBody", filteredBody);

      const filteredMileageFrom = filteredBody.filter((item) =>
        item.technical_characteristics &&
        item.technical_characteristics.hasOwnProperty("mileage")
          ? Number(item.technical_characteristics.mileage) >=
            Number(data.mileage_from)
          : item.hasOwnProperty("id")
      );

      console.log("filteredMileageFrom", filteredMileageFrom);

      const newFilteredMileageFrom: Array<DataInterface> = [];

      if (filteredMileageFrom.length === 0) {
        filteredMileageFrom.push(filteredBody);
      } else {
        filteredBody.map((item) => newFilteredMileageFrom.push(item));
      }

      const filteredMileageTo = filteredMileageFrom.filter((item) => {
        console.log("iitem", item);
        return (
          item.technical_characteristics &&
          data.mileage_to.length > 0 &&
          Number(item.technical_characteristics.mileage) <=
            Number(data.mileage_to)
        );
      });

      console.log("filteredMileageTo", filteredMileageTo);

      if (data.mileage_to === "") {
        if (filteredMileageTo.length === 0) {
          filteredMileageTo.push(...newFilteredMileageFrom);
        }
      }

      const sortedItems = filteredMileageTo.map((item, index) => item);
      console.log("itemsId", sortedItems);

      return {
        ...state,
        sortedItems: sortedItems,
      };

    case ItemsActionTypes.ACTIVE__ITEM:
      return { ...state, activePage: action.payload };

    default:
      return state;
  }
};
