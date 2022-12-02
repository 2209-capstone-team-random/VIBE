import { combineReducers } from "redux";
import userTopArtistsReducer from "./Spotify/userTopArtists";
import userTopTracksReducer from "./Spotify/userTopTracks";
import userProfileReducer from "./Spotify/userProfile";
import playerReducer from "./Spotify/player";

const appReducer = combineReducers({
  userTopArtists: userTopArtistsReducer,
  userTopTracks: userTopTracksReducer,
  userProfile: userProfileReducer,
  player: playerReducer,
});

export default appReducer;
