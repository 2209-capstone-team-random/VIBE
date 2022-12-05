import "./styles/index.css";
import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./auth/Auth";
import { Route, Routes } from "react-router-dom";
import CurrentUserProfile from "./components/Home/CurrentUserProfile";
import OnBoard from "./components/Login/OnBoard";
import Landing from "./components/Login/Landing";
import NotFound from "./components/NotFound";
import EditProfile from "./components/Profile/EditProfile";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();
  //spotify token
  let [token, setToken] = useState(null);

  useEffect(() => {
    const spotifyToken = JSON.parse(
      window.localStorage.getItem("sb-llxcoxktsyswmxmrwjsr-auth-token")
    )?.provider_token;
    setToken(spotifyToken);
  }, [token]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<Landing token={token} session={session} />}
      />
      <Route
        path="/onboard"
        element={<OnBoard token={token} session={session} />}
      />
      <Route
        path="/profile"
        element={<CurrentUserProfile token={token} session={session} />}
      />
      <Route
        path="/editProfile"
        element={<EditProfile token={token} session={session} />}
      />
      <Route path="*" element={<NotFound token={token} session={session} />} />
    </Routes>
  );
};

export default App;
