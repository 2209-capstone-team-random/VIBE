import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SpotifyPlayer from "react-spotify-web-playback";
import { fetchCurrentUserPlaylists } from "../../redux/Spotify/userPlaylists";

export default function Player(props) {
  const dispatch = useDispatch();
  const { items } = useSelector((store) => store.userPlaylists);
  const token = props.token;
  // console.log("User Playlists", items);

  useEffect(() => {
    dispatch(fetchCurrentUserPlaylists(token));
  }, []);
  if (items) {
    return (
      <div className="sticky z-50 mt-10">
        <SpotifyPlayer token={token} uris={[`${items[0].uri}`]} />;
      </div>
    );
  }
}
