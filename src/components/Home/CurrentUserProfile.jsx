import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TopPlaylists from "./TopPlaylists";
import SpotifyPlayer from "react-spotify-web-playback";
import { fetchUserByIdPlaylists } from "../../redux/Spotify/userPlaylists";
import NameBio from "./NameBio";
import WallPosts from "./WallPosts";
import NavBar from "./Navbar";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabaseClient";

export default function CurrentUserProfile({ token, session }) {
  const dispatch = useDispatch();
  const { items } = useSelector((store) => store.userPlaylists);
  const { userId } = useParams();
  const [vibe, setVibe] = useState(false);
  const [mutual, setMutual] = useState(false);
  const mySpotifySub = session?.user.user_metadata.sub;

  const vibeHandler = () => {
    if (mutual === false && vibe === false) {
      setVibeTrue(mySpotifySub, userId);
      setVibe(true);
      // if (mutual === true) {
      //   setMutualStatus(mySpotifySub, userId);
      //   setMutual(true);
      // }
    } else if (mutual === false && vibe === true) {
      setMutualStatus(mySpotifySub, userId);
    } else if (mutual === true && vibe === true) {
      removeVibe(mySpotifySub, userId);
      removeMutual(userId, mySpotifySub);
    }
  };
  const buttontest = () => {
    setMutualStatus(mySpotifySub, userId);
    setMutualStatus(userId, mySpotifySub);
    console.log("clicked");
  };

  //first case - 1 way they did not vibe with u, then add row

  const setVibeTrue = async (userSpotify, vibeSpotify) => {
    try {
      const { data, error } = await supabase
        .from("Vibe")
        .insert([{ userSpotify, vibeSpotify, mutual: false }]);
    } catch (error) {
      console.log(error);
    }
  };
  //second case - 1 way vibe and check if they vibe u, then invoke mutual function

  const setMutualStatus = async (userSpotify, vibeSpotify) => {
    try {
      let { data: userA } = await supabase
        .from("Vibe")
        .update({ mutual: "true" })
        .match({ userSpotify, vibeSpotify });
      // let { data: userB } = await supabase
      //   .from("Vibe")
      //   .update({ mutual: "true" })
      //   .match({ vibeSpotify, userSpotify });
    } catch (error) {
      console.log(error);
    }
  };

  //third case - remove vibe, remove row if no mutual, remove row

  const removeVibe = async (mySpotifySub, userId) => {
    try {
      const { data, error } = await supabase
        .from("Vibe")
        .delete()
        .match({ mySpotifySub, userId });
    } catch (error) {
      console.log(error);
    }
  };

  //forth case - remove vibe, if mutual, set other mutual to false and remove row
  const removeMutual = async (mySpotifySub, userId) => {
    try {
      const { data, error } = await supabase
        .from("Vibe")
        .update({ mutual: "false" })
        .match({ mySpotifySub: userId, userId: mySpotifySub });
    } catch (error) {}
  };

  const checkVibeTable = async (userSpotify, vibeSpotify) => {
    try {
      const { data: vibe, error } = await supabase
        .from("Vibe")
        .select("*")
        .match({ userSpotify, vibeSpotify });
      if (vibe.length === 0) {
        setVibe(false);
      } else if (vibe.length > 0) {
        setVibe(true);
        setMutual(vibe[0].mutual);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkVibeTable(mySpotifySub, userId);
  }, [vibe]);

  useEffect(() => {
    dispatch(fetchUserByIdPlaylists(userId, token));
  }, [token]);

  if (items) {
    return (
      <div className="flex flex-col justify-center items-center">
        <NavBar session={session} />
        <div>
          <button onClick={buttontest}>test</button>
          <br></br>
          <br></br>

          <br></br>

          <br></br>
        </div>
        {userId !== mySpotifySub ? (
          mutual ? (
            <button
              className="m-2 h-8 px-5 text-lg border-hidden  text-white rounded-xl transition-all duration-500 bg-gradient-to-tl from-pink-300 via-orange-300 to-pink-300 bg-size-200 bg-pos-0 hover:bg-pos-100"
              onClick={vibeHandler}
            >
              V I B E E !
            </button>
          ) : !vibe ? (
            <button
              className="m-2 h-8 px-5 stext-lg border-hidden  text-white rounded-xl transition-all duration-500 bg-gradient-to-tl from-purple-300 via-blue-300 to-purple-300 bg-size-200 bg-pos-0 hover:bg-pos-100"
              onClick={vibeHandler}
            >
              V I B E with Me!
            </button>
          ) : (
            <button
              className="m-2 h-8 px-5 stext-lg border-hidden  text-white rounded-xl transition-all duration-500 bg-gradient-to-tl from-purple-300 via-blue-300 to-purple-300 bg-size-200 bg-pos-0 hover:bg-pos-100"
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
