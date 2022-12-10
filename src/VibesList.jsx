import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { Link, useNavigate } from "react-router-dom";

const VibesList = ({ vibes, ownId }) => {
  const navigate = useNavigate();
  return (
    <div className="  border-2 border-black m-10 p-5 dark:border-white">
      <ul className="menu bg-base-100 w-56 dark:bg-zinc-600 ">
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
