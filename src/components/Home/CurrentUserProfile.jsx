import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import TopArtists from "./TopArtists";
import SpotifyPlayer from "react-spotify-web-playback";
import { fetchUserTracks } from "../../redux/Spotify/userTopTracks";
import NameBio from "./NameBio";
import WallPosts from "./WallPosts";
import NavBar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";

export default function CurrentUserProfile({ token, session }) {
  const dispatch = useDispatch();
  const { items } = useSelector((store) => store.userTopTracks);
  const { userId } = useParams();

  useEffect(() => {
    // if (!props.session) {
    //   navigate('/');
    // }
    dispatch(fetchUserTracks(token));
  }, [token]);
  if (items) {
    return (
      <div className="grid justify-items-center">
        <NavBar />
        <NameBio session={session} userId={userId} />
        <TopArtists token={token} />
        <div className="sticky z-50 bottom-0 mt-10 w-full">
          <SpotifyPlayer token={token} uris={items.map((item) => item.uri)} />
        </div>
      </div>
    );
  }
}
