import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCurrentUserPlaylists } from "../../redux/Spotify/userPlaylists";
import SpotifyPlayer from "react-spotify-web-playback";
export default function Player({ token }) {
  const dispatch = useDispatch();
  const discover = useSelector((store) => store.discover);

  const [play, setplay] = useState(false);
  useEffect(() => {
    dispatch(fetchCurrentUserPlaylists(token));
    setplay(true);
  }, [discover.uri]);

  return (
    <SpotifyPlayer
      className="sticky bottom-0 z-99"
      token={token}
      callback={(state) => {
        if (!state.isPlaying) setplay(false);
      }}
      play={play}
      uris={discover.uri.length ? [`${discover.uri}`] : []}
    />
  );
}
