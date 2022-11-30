import axios from "axios";

// Action Type
const SET_USER_ARTISTS = "SET_USER_ARTISTS";
const SET_USER_TRACKS = "SET_USER_TRACKS";

// Action Creator
export const setUserArtists = (artists) => {
  return {
    type: SET_USER_ARTISTS,
    artists,
  };
};

export const setUserTracks = (tracks) => {
  return {
    type: SET_USER_TRACKS,
    tracks,
  };
};

// Thunk Creator
export const fetchUserArtists = (token) => {
  return async (dispatch) => {
    try {
      const { data: items } = await axios.get(
        "https://api.spotify.com/v1/me/top/artists",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            time_range: "short_term",
          },
        }
      );
      console.log(items);
      dispatch(setUserArtists(items));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchUserTracks = (token) => {
  return async (dispatch) => {
    try {
      const { data: items } = await axios.get(
        "https://api.spotify.com/v1/me/top/tracks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            time_range: "short_term",
          },
        }
      );
      console.log(items);
      dispatch(setUserArtists(items));
    } catch (err) {
      console.log(err);
    }
  };
};

// Initial state
const initialState = [];

// Reducer
export default function userTopItemsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_ARTISTS: {
      return action.artists;
    }
    case SET_USER_TRACKS: {
      return action.tracks;
    }

    default:
      return state;
  }
}
