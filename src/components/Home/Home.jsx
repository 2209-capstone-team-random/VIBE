import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import axios from "axios";
import { connect, useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Top3Artists from "./Top3Artists";

export default function Home() {
  return (
    <div>
      <h1 className="flex justify-center items-center font-medium text-3xl">
        Welcome
      </h1>
      <Top3Artists />
    </div>
  );
}
