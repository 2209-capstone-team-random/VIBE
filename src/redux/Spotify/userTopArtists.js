import axios from "axios";

// Action Type
const SET_USER_ARTISTS = "SET_USER_ARTISTS";

// Action Creator
export const setUserArtists = (artists) => {
  return {
    type: SET_USER_ARTISTS,
    artists,
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
            limit: "10",
            time_range: "short_term",
          },
        }
      );
      // console.log("CURRENT USER TOP ARTISTS", items);
      dispatch(setUserArtists(items));
    } catch (err) {
      console.log(err);
    }
  };
};

// Initial state
const initialState = [];

// Reducer
export default function userTopArtistsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_ARTISTS: {
      return action.artists;
    }

    default:
      return state;
  }
}
