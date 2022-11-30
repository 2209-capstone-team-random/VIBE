import { combineReducers } from "redux";
import userTopItemsReducer from "./userTopItems";
import userProfileReducer from "./userProfile";

const appReducer = combineReducers({
  userTopItems: userTopItemsReducer,
  userProfile: userProfileReducer,
});

export default appReducer;
