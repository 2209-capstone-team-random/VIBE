import axios from "axios";

// Action Type
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_BY_ID_PROFILE = "SET_USER_BY_ID_PROFILE";

// Action Creator
export const setUserProfile = (user) => {
  return {
    type: SET_USER_PROFILE,
    user,
  };
};

export const setUserByIdProfile = (user) => {
  return {
    type: SET_USER_BY_ID_PROFILE,
    user,
  };
};

// Thunk Creator
export const fetchUserProfile = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("CURRENT USER PROFILE", data);
      dispatch(setUserProfile(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchUserByIdProfile = (token, userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("USER BY ID PROFILE", data);
      dispatch(setUserByIdProfile(data));
    } catch (err) {
      console.log(err);
    }
  };
};

// Initial state
const initialState = {};

// Reducer
export default function userProfileReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_PROFILE: {
      return action.user;
    }
    case SET_USER_BY_ID_PROFILE: {
      return action.user;
    }

    default:
      return state;
  }
}
