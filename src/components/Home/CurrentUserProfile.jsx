import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import TopPlaylists from "./TopPlaylists";
import SpotifyPlayer from "react-spotify-web-playback";
import { fetchUserByIdPlaylists } from "../../redux/Spotify/userPlaylists";
import NameBio from "./NameBio";
import WallPosts from "./WallPosts";
import NavBar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import TopTracks from "./TopTracks";
import TopArtists from "./TopArtists";

export default function CurrentUserProfile({ token, session }) {
  const dispatch = useDispatch();
  const { items } = useSelector((store) => store.userPlaylists);
  const { userId } = useParams();
  const [vibe, setVibe] = useState(false);
  console.log("session", session);
  const vibeHandler = () => {
    console.log("clicked");
  };

  useEffect(() => {
    // let { data: Vibe, error } = await supabase
    //   .from("Vibe")
    //   .select("mutual")
    //   // .match({ userSpotify:userId, vibeSpotify
    //   //  });
  }, []);

  useEffect(() => {
    dispatch(fetchUserByIdPlaylists(userId, token));
  }, [token]);
  if (items) {
    return (
      <div className="flex flex-col justify-center items-center">
        <NavBar />
        <button onClick={vibeHandler}>V I B E</button>
        <NameBio session={session} userId={userId} />
        <TopPlaylists session={session} token={token} />
        <TopTracks session={session} token={token} />
        <TopArtists session={session} token={token} />
        <WallPosts session={session} />
        <div className="fixed z-10 bottom-0 mt-10 w-full">
          <SpotifyPlayer token={token} uris={items.map((item) => item.uri)} />
        </div>
      </div>
    );
  }
  console.log("Sorry, we could not load your profile.");
}
