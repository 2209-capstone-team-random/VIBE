import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import TopPlaylists from "./TopPlaylists";
import SpotifyPlayer from "react-spotify-web-playback";
import { fetchUserTracks } from "../../redux/Spotify/userTopTracks";
import { fetchUserByIdPlaylists } from "../../redux/Spotify/userPlaylists";
import NameBio from "./NameBio";
import WallPosts from "./WallPosts";
import NavBar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import TopTracks from "./TopTracks";

export default function CurrentUserProfile({ token, session }) {
  const dispatch = useDispatch();
  // const { items } = useSelector((store) => store.userTopTracks);
  const { items } = useSelector((store) => store.userPlaylists);
  const { userId } = useParams();

  useEffect(() => {
    dispatch(fetchUserTracks(token));
    dispatch(fetchUserByIdPlaylists(userId, token));
  }, [token]);
  if (items) {
    return (
      <div className="flex flex-col justify-center items-center">
        <NavBar />
        <NameBio session={session} userId={userId} />
        <TopPlaylists session={session} token={token} />
        <TopTracks session={session} token={token} />
        <WallPosts session={session} />
        <div className="fixed z-10 bottom-0 mt-10 w-full">
          <SpotifyPlayer token={token} uris={items.map((item) => item.uri)} />
        </div>
      </div>
    );
  }
  console.log("Sorry, we could not load your profile.");
}
