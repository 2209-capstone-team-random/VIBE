import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SpotifyPlayer from "react-spotify-web-playback";
import { fetchCurrentUserPlaylists } from "../../redux/Spotify/userPlaylists";

export default function Player({ token }) {
  const dispatch = useDispatch();
  const discover = useSelector((store) => store.discover);

  const [play, setplay] = useState(false);
  useEffect(() => {
    dispatch(fetchCurrentUserPlaylists(token));
    setplay(true);
  }, [discover.uri]);

  return (
    <div className="fixed z-10 bottom-0 mt-10 w-full">
      <SpotifyPlayer
        className=" sticky"
        token={token}
        callback={(state) => {
          if (!state.isPlaying) setplay(false);
        }}
        play={play}
        uris={discover.uri.length ? [`${discover.uri}`] : []}
      />
    </div>
  );
}
