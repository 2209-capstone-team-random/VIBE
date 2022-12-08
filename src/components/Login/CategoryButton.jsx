import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CategoryButton = ({ session }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { genre } = useSelector((state) => state);
  const { user } = useSelector((state) => state);

  let spotifyId = session?.user.user_metadata.sub;
  let spotifyName = session?.user.user_metadata.name;

  const userId = session?.user.id;
  const onBoarding = async (id) => {
    const { data, error } = await supabase
      .from("User")
      .update({ isFirstTimeUser: false })
      .match({ id });
    if (error) {
      console.log(error);
    }
  };
  console.log(spotifyId);
  console.log(spotifyName);

  const addCategories = async (userSpotify, catA, catB, catC) => {
    try {
      let { data, error } = await supabase
        .from("User_Top_Cat")
        .insert([{ userSpotify, catA, catB, catC }])
        .select();
      console.log("data", data);
    } catch (error) {
      console.log(error);
    }
  };

  const clickHandler = () => {
    //set first time user status to false
    onBoarding(userId);
    //adding cat to first time user
    addCategories(spotifyId, genre[0], genre[1], genre[2]);
    //rerouting
    navigate(`/profile/${spotifyName}`);
  };

  return (
    <button
      className="m-2 h-12 px-5 text-lg border-hidden  text-white rounded-xl transition-all duration-500 bg-gradient-to-tl from-blue-500 via-sky-300 to-blue-500 bg-size-200 bg-pos-0 hover:bg-pos-100"
      onClick={clickHandler}
    >
      LET'S VIBE
    </button>
  );
};

export default CategoryButton;
