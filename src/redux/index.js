import { combineReducers } from "redux";
import userTopItemsReducer from "./userTopItems";
import userProfileReducer from "./userProfile";
import discover from "./discover";

const appReducer = combineReducers({
  userTopItems: userTopItemsReducer,
  userProfile: userProfileReducer,
  discover,
});

export default appReducer;
