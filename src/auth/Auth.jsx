import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import axios from "axios";
import AUTH_URL from "./Auth_Url";
import CurrentUserProfile from "../components/Home/currentUserProfile";
import TopArtists from "../components/Home/TopArtists";
import Player from "../components/Home/Player";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    // Set Token and store in Local Storage
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      let urlParams = new URLSearchParams(hash.replace("#", "?"));
      token = urlParams.get("access_token");

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  // Remove Token from Local Storage
  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* <div className="col-6 form-widget" aria-live="polite">
        <h1 className="header">Supabase + React</h1>
        {loading ? (
          "Sending magic link..."
        ) : (
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="button block" aria-live="polite">
              Send magic link
            </button>
          </form>
        )}
      </div> */}
      <h1 className="flex justify-center items-center font-medium text-6xl">
        Navbar placeholder
      </h1>
      {token ? (
        <div>
          <div className="flex space-x-2 justify-end mr-24">
            <button className="btn btn-sm btn-accent mb-4" onClick={logout}>
              Logout
            </button>
          </div>
          <div className="flex justify-center">
            <CurrentUserProfile token={token} />
          </div>
        </div>
      ) : (
        <a
          className="flex justify-center items-center h-screen p-20"
          href={AUTH_URL}
        >
          <button className="btn btn-sm btn-accent" type="submit">
            Login
          </button>
        </a>
      )}
    </div>
  );
}
