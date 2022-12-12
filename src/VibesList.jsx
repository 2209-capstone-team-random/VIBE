import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { Link, useNavigate } from "react-router-dom";

const VibesList = ({ vibes, ownId }) => {
  const navigate = useNavigate();
  return (
    <div className=" border-2 border-black dark:bg-gray-600  m-10 p-5 flex flex-wrap justify-evenly  bg-white dark:border-white">
      <ul className="menu w-56 bg-white dark:bg-gray-600 ">
        {vibes.map((vibe) => {
          return (
            <li key={vibe.id}>
              <a href={`../profile/${vibe.vibeSpotify}`}>{vibe.vibeSpotify}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default VibesList;
