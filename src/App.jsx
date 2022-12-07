import "./styles/index.css";
import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { Route, Routes } from "react-router-dom";
import CurrentUserProfile from "./components/Home/CurrentUserProfile";
import OnBoard from "./components/Login/OnBoard";
import Landing from "./components/Login/Landing";
import NotFound from "./components/NotFound";
import EditProfile from "./components/Profile/EditProfile";
import { useNavigate } from "react-router-dom";
import Discover from "./components/Discover/Discover";

const App = () => {
  const [session, setSession] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const spotifyToken = JSON.parse(
  //     window.localStorage.getItem("sb-llxcoxktsyswmxmrwjsr-auth-token")
  //   )?.provider_token;
  //   setToken(spotifyToken);
  // }, [token]);

  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });
  // }, []);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setToken(session?.provider_token);
    }, []);
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setToken(session?.provider_token);
    });
  }, []);

  //if session and fisrtime user
  //if session
  useEffect(() => {
    // if (session?.provider_token) {
    //   navigate("/onboard");
    // }
  }, [session]);
  console.log("session", session);
  console.log("token", token);
  // console.log('sessionspotifytoken',session.provider_token)
  return (
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route
        path="/onboard"
        element={<OnBoard session={session} token={token} />}
      />
      <Route
        path="/discover"
        element={<Discover session={session} token={token} />}
      />
      <Route
        path="/profile/:userId"
        element={<CurrentUserProfile session={session} token={token} />}
      />
      <Route
        path="/editProfile"
        element={<EditProfile session={session} token={token} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
