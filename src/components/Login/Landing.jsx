import React, { useState, useEffect } from "react";
import video from "../../assets/connect2.mp4";
import Typed from "react-typed";
import Bee from "../../assets/bee.png";
import { supabase } from "../../supabaseClient";
import { Navigate, useNavigate } from "react-router-dom";

// import LoginButton from "./LoginButton";

const Landing = ({ isFirstTimeUser, session }) => {
  let [token, setToken] = useState("");
  const navigate = useNavigate();
  async function signInWithSpotify() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "spotify",
        options: {
          scopes: `ugc-image-upload
    user-modify-playback-state
    user-read-playback-state
    user-read-currently-playing
    streaming
    app-remote-control
    user-library-modify
    user-library-read
    user-top-read
    user-read-email
    user-read-private
    user-read-playback-position
    user-read-recently-played
    user-follow-read
    user-follow-modify
    playlist-read-private
    playlist-read-collaborative
    playlist-modify-public
    playlist-modify-private`,
        },
      });
      setToken(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    console.log("isfirst", isFirstTimeUser);
    if (isFirstTimeUser && session) {
      navigate("/onboard");
    } else if (!isFirstTimeUser && session) {
      navigate("/profile");
    }
  }, [isFirstTimeUser]);

  return (
    <div className="w-full h-screen relative">
      <video
        className="bg-cover w-full h-full object-cover"
        src={video}
        autoPlay
        loop
        muted
      />
      <div className="absolute top-0 w-full h-full flex flex-col justify-center text-center text-white p-4 bg-gray-900/50 select-none">
        <div className="flex justify-center item-center">
          <img src={Bee} className="object-contain h-50 w-96 " alt="logo" />
        </div>
        <h1 className="text-8xl ">V I B E</h1>
        <Typed
          className="text-4xl md:text-4xl font-bold"
          strings={["Discover.", "Listen.", "Connect."]}
          typeSpeed={80}
          backSpeed={80}
          loop
        />
        <div className="p-7">
          <button
            className="m-2 h-12 px-5 text-lg border-hidden  text-white rounded-xl transition-all duration-500 bg-gradient-to-tl from-blue-500 via-sky-300 to-blue-500 bg-size-200 bg-pos-0 hover:bg-pos-100"
            onClick={signInWithSpotify}
          >
            Login with Spotify
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
