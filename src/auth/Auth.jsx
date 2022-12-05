import React, { useState, useEffect } from "react";
// import TopArtists from "../components/Home/TopArtists";
// import TopTracks from "../components/Home/TopTracks";
import { useDispatch, useSelector } from "react-redux";
import Landing from "../components/Login/Landing";
import Home from "../components/Home/Home";
import { getUser } from "../redux/dbQueryThunks/user";
import OnBoard from "../components/Login/OnBoard";

export default function Auth() {
  const [token, setToken] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(true);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);

  //check user status if NOT firsttime user,firsttime false renders home component.
  // const [isFirstTime, setIsFirstTime] = useState(true);
  // const { user } = useSelector((state) => state)
  const checkUserState = () => {
    if (user[0].isFirstTimeUser === false) {
      setIsFirstTime(false);
    }
  };

  //load user info on pageload and run checkUserStat
  useEffect(() => {
    dispatch(getUser(10));
  }, []);

  useEffect(() => {
    if (user !== null) {
      checkUserState();
    }
  }, [user]);

  // useEffect(() => {
  //   // Set Token and store in Local Storage
  //   const hash = window.location.hash;
  //   let token = window.localStorage.getItem("token");

  //   if (!token && hash) {
  //     let urlParams = new URLSearchParams(hash.replace("#", "?"));
  //     token = urlParams.get("access_token");
  //     window.location.hash = "";
  //     window.localStorage.setItem("token", token);
  //   }
  //   setToken(token);
  // }, []);

  // //need user Id

  // // Remove Token from Local Storage
  // const logout = () => {
  //   setToken("");
  //   window.localStorage.removeItem("token");
  // };

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
