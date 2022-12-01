import axios from "axios";

// Action Type
const SET_PLAYBACK_STATE = "SET_PLAYBACK_STATE";
const START_PLAYBACK = "START_PLAYBACK";
const PAUSE_PLAYBACK = "PAUSE_PLAYBACK";
const CHANGE_VOLUME = "CHANGE_VOLUME";
const AUDIO_SEEK = "AUDIO_SEEK";

// Action Creator
export const setPlaybackState = (playbackState) => {
  return {
    type: SET_PLAYBACK_STATE,
    playbackState,
  };
};

export const _startPlayback = (playbackState) => {
  return {
    type: START_PLAYBACK,
    playbackState,
  };
};

export const _pausePlayback = (playbackState) => {
  return {
    type: PAUSE_PLAYBACK,
    playbackState,
  };
};

export const _changeVolume = (playbackState) => {
  return {
    type: CHANGE_VOLUME,
    playbackState,
  };
};

export const _audioSeek = (playbackState) => {
  return {
    type: AUDIO_SEEK,
    playbackState,
  };
};

// Thunk Creator
export const fetchPlaybackState = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/me/player", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("PLAYBACK STATE", data);
      dispatch(setPlaybackState(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const startPlayback = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        "https://api.spotify.com/v1/me/player/play",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      dispatch(startPlayback(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const pausePlayback = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        "https://api.spotify.com/v1/me/player/pause",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      dispatch(pausePlayback(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const changeVolume = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        "https://api.spotify.com/v1/me/player/volume",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            volume_percent: "50",
          },
        }
      );
      console.log(data);
      dispatch(changeVolume(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const audioSeek = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        "https://api.spotify.com/v1/me/player/seek",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            position_ms: "25000",
          },
        }
      );
      console.log(data);
      dispatch(audioSeek(data));
    } catch (err) {
      console.log(err);
    }
  };
};

// Initial state
const initialState = {};

// Reducer
export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PLAYBACK_STATE: {
      return action.playbackState;
    }
    case START_PLAYBACK: {
      return action.playbackState;
    }
    case PAUSE_PLAYBACK: {
      return action.playbackState;
    }
    case CHANGE_VOLUME: {
      return action.playbackState;
    }

    default:
      return state;
  }
}
