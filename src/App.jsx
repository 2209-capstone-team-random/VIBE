import "./styles/index.css";
import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./auth/Auth";
import Account from "./auth/Accounts";
import Login from "./auth/Login";
// import * as dotenv from 'dotenv';
// dotenv.config();

export default function App() {
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
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  );
}
