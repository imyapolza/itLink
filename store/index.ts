// create a makeStore function
import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, createStore, compose } from "redux";
import { reducer } from "./reducers";
import thunk from "redux-thunk";

let composeEnhancers = compose;

if (typeof window !== "undefined") {
  composeEnhancers =
    (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
}

const makeStore = () =>
  createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
