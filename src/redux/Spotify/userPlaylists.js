import axios from "axios";

// Action Type
const SET_CURRENT_USER_PLAYLISTS = "SET_CURRENT_USER_PLAYLISTS";

// Action Creator
export const setCurrentUserPlaylists = (playlists) => {
  return {
    type: SET_CURRENT_USER_PLAYLISTS,
    playlists,
  };
};

// Thunk Creator
export const fetchCurrentUserPlaylists = (token) => {
  return async (dispatch) => {
    try {
      const { data: items } = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            limit: "5",
          },
        }
      );
      // console.log("CURRENT USER TOP PLAYLISTS", items);
      dispatch(setCurrentUserPlaylists(items));
    } catch (err) {
      console.log(err);
    }
  };
};

// Initial state
const initialState = [];

// Reducer
export default function userPlaylistsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER_PLAYLISTS: {
      return action.playlists;
    }

    default:
      return state;
  }
}
