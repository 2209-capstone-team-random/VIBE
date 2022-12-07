import React, { useState } from "react";
import { useSelector } from "react-redux";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CategoryButton = ({ click }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state);
  // useEffect(()=>{},[])
  const onBoarding = async (id) => {
    const { data, error } = await supabase
      .from("User")
      .update({ isFirstTimeUser: false })
      .match({ id })
      .select();
    console.log("data", data);
    if (error) {
      console.log(error);
    }
  };

  const addCategories = async (userId, catA, catB, catC) => {
    try {
      let { data: user, error } = await supabase
        .from("User_Top_Cat")
        .insert([{ userId, catA, catB, catC }]);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const clickHandler = () => {
    //set user status to false
    onBoarding(10);
    addCategories(6, "rock", "edm", "indie");
    click();
    navigate("/profile");
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
