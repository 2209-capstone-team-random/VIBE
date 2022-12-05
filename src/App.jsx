import "./styles/index.css";
import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./auth/Auth";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import OnBoard from "./components/Login/OnBoard";
import Landing from "./components/Login/Landing";
import NotFound from "./components/NotFound";
import Edit from "./components/Profile/Edit"
// import Account from "./auth/Accounts";



 


const App = () => {
  const [session, setSession] = useState(null);

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
      <Route exact path="/" element={<Landing />} />
      <Route  path="/onboard" element={<OnBoard />} />
      <Route  path="/profile" element={<Home />} />
      <Route path="/editProfile" element={<Edit />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
