import { combineReducers, createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import userTopArtistsReducer from "./Spotify/userTopArtists";
import userTopTracksReducer from "./Spotify/userTopTracks";
import userProfileReducer from "./Spotify/userProfile";
import playerReducer from "./Spotify/player";
import user from "./dbQueryThunks/user"


const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const appReducer = combineReducers({
  userTopArtists: userTopArtistsReducer,
  userTopTracks: userTopTracksReducer,
  userProfile: userProfileReducer,
  player: playerReducer,
  user : user
});

const store = createStore(appReducer, middleware);

export default appReducer;
