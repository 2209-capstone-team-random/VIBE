import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function NameBio() {
  return (
    <div className="flex flex-row mb-10 mr-60">
      <div className="avatar online h-20">
        <div className="rounded-full">
          <img src="https://i.pinimg.com/564x/67/e5/bb/67e5bba8b7e5d23c035bb7b0595581d0.jpg" />
        </div>
      </div>
      <div className="flex-column ml-20">
        <p className="mb-4">Name</p>
        <p className="mb-4">Bio</p>
      </div>
    </div>
  );
}
