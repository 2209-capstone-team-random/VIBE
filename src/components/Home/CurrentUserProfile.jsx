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
  const mySpotifySub = session?.user.user_metadata.sub;

  const vibeHandler = () => {
    console.log("clicked");
    setVibe(!vibe);
  };

  const checkMutual = async (userSpotify, vibeSpotify) => {
    try {
      const { data: vibe, error } = await supabase
        .from("Vibe")
        .select("mutual")
        .match({ userSpotify, vibeSpotify });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {}, []);

  useEffect(() => {
    dispatch(fetchUserByIdPlaylists(userId, token));
  }, [token]);
  if (items) {
    return (
      <div className="flex flex-col justify-center items-center">
        <NavBar />
        {userId !== mySpotifySub ? (
          !vibe ? (
            <button
              className="m-2 h-8 px-5 text-lg border-hidden  text-white rounded-xl transition-all duration-500 bg-gradient-to-tl from-blue-500 via-sky-300 to-blue-500 bg-size-200 bg-pos-0 hover:bg-pos-100"
              onClick={vibeHandler}
            >
              V I B E
            </button>
          ) : (
            <button
              className="m-2 h-8 px-5 stext-lg border-hidden  text-white rounded-xl transition-all duration-500 bg-gradient-to-tl from-pink-300 via-orange-300 to-pink-300 bg-size-200 bg-pos-0 hover:bg-pos-100"
              onClick={vibeHandler}
            >
              V I B E D
            </button>
          )
        ) : (
          <></>
        )}
        <NameBio session={session} userId={userId} />
        <TopPlaylists session={session} token={token} />
        {/* <TopTracks session={session} token={token} />
        <TopArtists session={session} token={token} /> */}
        <WallPosts session={session} />
        <div className="fixed z-10 bottom-0 mt-10 w-full">
          <SpotifyPlayer token={token} uris={items.map((item) => item.uri)} />
        </div>
      </div>
    );
  }
  console.log("Sorry, we could not load your profile.");
}
