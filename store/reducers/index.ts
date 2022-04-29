import { combineReducers, AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";

import { items } from "./items";
import { ItemsState } from "../../types/items";

const rootReducer = combineReducers({
  users: items,
});

export const reducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.count) nextState.count = state.count; // preserve count value on client side navigation
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
