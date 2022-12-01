import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import axios from "axios";
import { connect, useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchUserArtists,
  fetchUserTracks,
} from "../../redux/Spotify/userTopItems";
import { fetchCurrentUserProfile } from "../../redux/Spotify/userProfile";

export default function Top3Artists() {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-end">
      <div className="block p-6 rounded-lg shadow-lg bg-cyan-400 max-w-sm">
        <div className=" mb-4">Some quick example</div>
      </div>
    </div>
  );
}
