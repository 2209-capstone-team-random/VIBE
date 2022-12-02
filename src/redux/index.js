import { combineReducers } from "redux";
import userTopItemsReducer from "./Spotify/userTopItems";
import userProfileReducer from "./Spotify/userProfile";
import playerReducer from "./Spotify/player";

const appReducer = combineReducers({
  userTopItems: userTopItemsReducer,
  userProfile: userProfileReducer,
  player: playerReducer,
});

export default appReducer;
