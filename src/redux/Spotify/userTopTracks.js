import axios from "axios";

// Action Type
const SET_USER_TRACKS = "SET_USER_TRACKS";

// Action Creator
export const setUserTracks = (tracks) => {
  return {
    type: SET_USER_TRACKS,
    tracks,
  };
};

// Thunk Creator
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
            limit: "5",
            time_range: "short_term",
          },
        }
      );
      // console.log("CURRENT USER TOP TRACKS", items);
      dispatch(setUserTracks(items));
    } catch (err) {
      console.log(err);
    }
  };
};

// Initial state
const initialState = [];

// Reducer
export default function userTopTracksReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_TRACKS: {
      return action.tracks;
    }

    default:
      return state;
  }
}
