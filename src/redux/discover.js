import axios from "axios";

const GET_TOP_TRACKS = "GET_TOP_TRACKS";
const GET_USER = "GET_USER";
const getGenre = (track) => {
  return {
    type: GET_TOP_TRACKS,
    track,
  };
};

export const fetchTopTracks = (genre) => {
  return async (dispatch) => {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/recommendations/",
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          seed_genre: genre,
          target_popularity: 100,
        },
      }
    );
    dispatch(getGenre(data));
    console.log(data);
  };
};

export default function discover(state = [], action) {
  switch (action.type) {
    case GET_TOP_TRACKS: {
      return action.track;
    }
    default:
      return state;
  }
}
