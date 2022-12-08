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

  const [isFirstTimeUser, setIsFirstTimeUser] = useState("");
  const navigate = useNavigate();

  // if (session) {
  //   const userId = session?.user.identities[0].user_id;
  // }
  const getUserStatus = async (userId) => {
    try {
      let { data: User, error } = await supabase
        .from("User")
        .select("isFirstTimeUser")
        .eq("id", userId);
      setIsFirstTimeUser(User[0].isFirstTimeUser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession(session);
        setToken(session.provider_token);
        let userId = session.user.identities[0].user_id;
        getUserStatus(userId);
      } else {
        supabase.auth.onAuthStateChange((event, session) => {
          if (event == "SIGNED_OUT") {
            setSession(null);
          }
        });
      }
    });
  }, []);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <Landing isFirstTimeUser={isFirstTimeUser} session={session} />
        }
      />
      <Route
        path="/onboard"
        element={<OnBoard token={token} session={session} />}
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
