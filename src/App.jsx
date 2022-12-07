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
import { set } from "zod";

const App = () => {
  const [session, setSession] = useState(null);
  const [token, setToken] = useState(null);
  const [firstVisit, setFirstVisit] = useState(false);
  const navigate = useNavigate();

  // const getUserStatus = async (userId) => {
  //   try {
  //     let { data, error } = await supabase
  //       .from("User")
  //       .select("isFirstTimeUser")
  //       .eq("id", userId);
  //     setFirstVisit(data[0].isFirstTimeUser);
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const click = () => {
    setFirstVisit(false);
  };

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setSession(session);
        setToken(session.provider_token);
      } else {
        navigate("/");
        supabase.auth.onAuthStateChange((event, session) => {
          if (event == "SIGNED_OUT") {
            setSession(null);
            setToken(session.provider_token);
          }
        });
      }
    };
    fetchSession();
  }, []);

  //if session and fisrtime user
  //if session
  // useEffect(() => {
  // if (session?.provider_token) {
  //   navigate("/onboard");
  // }
  // }, [session]);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<Landing session={session} click={click} visit={firstVisit} />}
      />
      <Route
        path="/onboard"
        element={<OnBoard click={click} token={token} />}
      />
      <Route
        path="/discover"
        element={<Discover session={session} token={token} />}
      />
      <Route
        path="/profile"
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
