import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import axios from "axios";

export default function Login() {
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const CLIENT_ID = "f66d801286b24df78db5be66cb18b8e4";
  const REDIRECT_URI = "http://localhost:5173/";
  const RESPONSE_TYPE = "token";
  const scope = `ugc-image-upload
    user-modify-playback-state
    user-read-playback-state
    user-read-currently-playing
    streaming
    app-remote-control
    user-library-modify
    user-library-read
    user-top-read
    user-read-email
    user-read-private
    user-read-playback-position
    user-read-recently-played
    user-follow-read
    user-follow-modify
    playlist-read-private
    playlist-read-collaborative
    playlist-modify-public
    playlist-modify-private`;

  const AUTH_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scope}`;

  const [token, setToken] = useState("");
  const [myInfo, setMyInfo] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const me = async () => {
    try {
      const { data } = await axios.get(
        "https://api.spotify.com/v1/me/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMyInfo(data.items);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  //TESTED DB FETCH ID
    //adding a friend, need to change to u
    const addFriends = async ()=>{
      try {
        const { data, error } = await supabase
      .from('Vibe')
      .insert([
      { friendId: 13, userId: 6 },
    ])
    console.log('clicked')
      } catch (error) {
        console.log(error)
      }
    }
  
  // fetching user's friends
  const superbaseDB = async () => {
    try {
      let { data: friends, error } = await supabase.from("Vibe").select("friendId").eq("userId",6);
      console.log("before map",friends);

     let users = await Promise.all(friends.map(friend => 
       supabase
      .from("User")
      .select("*")
      .eq("id",friend.friendId)))
      console.log("after map",users)
    } catch (error) {
      console.log(error);
    }
  };

  //
  const addCategories =async ()=>{
    try {
      let { data: users, error } = await supabase
  .from('User_Top_Cat')
  .select('*') 
  console.log(users)
  let filteredUsers = users.filter(user=>user.favCats.includes('pop'))
  console.log(filteredUsers)
    } catch (error) {
      console.log(error)
    }
  }

  //checkFriend
  const checkFriend = async() => {
    try {
      let {data:userA, error} = await supabase
      .from('Vibe')
      .select('*')
      .eq("userId",6)
      console.log(userA)
      let {data:userB} = await supabase
      .from('Vibe')
      .select('*')
      .eq("userId",13)
      console.log(userB)
      
      let { data : user6}  = 
      await supabase.from("Vibe").select("mutual").match({userId:6,friendId:13})
      // let user13 = user6.filter(user=>user.friendId ===13)
      let {data:mutual}  = await supabase
      .from('Vibe')
      .update({ mutual: 'true' })
      .match({userId:6,friendId:13})

      console.log('user6',user6)
      console.log('mutual',mutual)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1 className="flex justify-center items-center font-medium text-6xl">
        Vibe
      </h1>
      {!token ? (
        <a
          className="flex justify-center items-center h-screen p-20"
          href={AUTH_URL}
        >
          <button
            className="bg-teal-500 hover:bg-teal-700 h-10 w-40 active:ring"
            type="submit"
            href={AUTH_URL}
          >
            Login
          </button>
        </a>
      ) : (
        <div>
          <h1 className="flex justify-center items-center font-medium text-3xl">
            Welcome
          </h1>
          <button onClick={superbaseDB}>getfriend</button>
          <button onClick={addFriends}>addfriend</button>
          <button onClick={addCategories}>addCategories</button>
          <button onClick={checkFriend}>checkfriend</button>
          <a className="flex justify-center items-center">
            <button
              className="bg-teal-500 hover:bg-teal-700 h-10 w-40 active:ring"
              onClick={me}
            >
              Get My Info
            </button>
          </a>
          <a className="flex justify-center items-center h-screen p-20">
            <button
              className="bg-teal-500 hover:bg-teal-700 h-10 w-40 active:ring"
              onClick={logout}
            >
              Logout
            </button>
          </a>
        </div>
      )}
    </div>
  );
}
