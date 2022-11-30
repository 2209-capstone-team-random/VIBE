import { createStore, applyMiddleware } from "redux";
import axios from "axios";
import appReducer from "./redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { createDevTools } from "@redux-devtools/core";

const RESET_STORE = "RESET_STORE";
export const resetStore = () => ({ type: RESET_STORE });
const rootReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    state = undefined;
    return appReducer(state, action);
  }
  return appReducer(state, action);
};

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
