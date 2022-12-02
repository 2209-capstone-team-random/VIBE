import axios from "axios";
import { supabase } from "../supabaseClient";

const GET_TOP_TRACKS = "GET_TOP_TRACKS";
const GET_USER = "GET_USER";

const getTopTracks = (track) => {
  return {
    type: GET_TOP_TRACKS,
    track,
  };
};
const getUserGenre = (user) => {
  return {
    type: GET_USER,
    user,
  };
};

export const fetchUserGenre = (genre) => {
  return async (dispatch) => {
    try {
      const { data, error } = await supabase
        .from("user")
        .select()
        .like("genre", `%${genre}%`);
      dispatch(getUserGenre(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchTopTracks = (genre, token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        "https://api.spotify.com/v1/recommendations/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            seed_genres: genre,
            target_popularity: 100,
            limit: 20,
          },
        }
      );
      dispatch(getTopTracks(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {
  users: [],
  list: [],
};

export default function discover(state = initialState, action) {
  switch (action.type) {
    case GET_TOP_TRACKS: {
      return { ...state, list: action.track };
    }
    case GET_USER: {
      return { ...state, users: action.user };
    }

    default:
      return state;
  }
}
