import React, { useState, useEffect } from "react";
// import TopArtists from "../components/Home/TopArtists";
// import TopTracks from "../components/Home/TopTracks";
import { useDispatch ,useSelector } from "react-redux";
import Landing from "../components/Login/Landing";
import Home from "../components/Home/Home";
import { getUser } from "../redux/dbQueryThunks/user";
import OnBoard from "../components/Login/OnBoard";
import { supabase } from "../supabaseClient";

export default function Auth() {
  const [token, setToken] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(true);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state)
 
  
  const getUser = async(userId) => {
    let { data: User, error } = await supabase
      .from("User")
      .select("*")
      .eq("id", userId)
    setIsFirstTime(User)
  }
  
  useEffect(() => {
    getUser(6) 
    // () => { dispatch(getUser(6)) };
    // if (user[0].isFirstTimeUser===false) {
    //   setIsFirstTime(false)
    // }
  }, []);
  
  
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
  
  //need user Id
  
  // Remove Token from Local Storage
  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <div>
      {token && isFirstTime ? (
        <OnBoard />
      ) : token && !isFirstTime ? (
        <Home logout={logout} token={token} />
      ) : (
        <Landing />
      )}
    </div>
  );
}
