import axios from "axios";

// Action Type
const SET_CURRENT_USER_PLAYLISTS = "SET_CURRENT_USER_PLAYLISTS";
const SET_USER_BY_ID_PLAYLISTS = "SET_USER_BY_ID_PLAYLISTS";

// Action Creator
export const setCurrentUserPlaylists = (playlists) => {
  return {
    type: SET_CURRENT_USER_PLAYLISTS,
    playlists,
  };
};

export const setUserByIdPlaylists = (playlists) => {
  return {
    type: SET_USER_BY_ID_PLAYLISTS,
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
      dispatch(setCurrentUserPlaylists(items));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchUserByIdPlaylists = (userId, token) => {
  return async (dispatch) => {
    try {
      const { data: items } = await axios.get(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
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
      dispatch(setUserByIdPlaylists(items));
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
    case SET_USER_BY_ID_PLAYLISTS: {
      return action.playlists;
    }

    default:
      return state;
  }
}
