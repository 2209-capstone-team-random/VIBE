import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import axios from "axios";
import AUTH_URL from "./Auth_Url";
import TopArtists from "../components/Home/TopArtists";
import TopTracks from "../components/Home/TopTracks";
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
          <div className="flex space-x-2 justify-end">
            <button
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
              onClick={logout}
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Logout
              </span>
            </button>
          </div>
          <div>
            <TopArtists token={token} />
            {/* <TopTracks token={token} />; */}
            <Player token={token} />
          </div>
        </div>
      ) : (
        <a
          className="flex justify-center items-center h-screen p-20"
          href={AUTH_URL}
        >
          <button
            className="bg-teal-500 hover:bg-teal-700 h-10 w-40 active:ring"
            type="submit"
          >
            Login
          </button>
        </a>
      )}
    </div>
  );
}
