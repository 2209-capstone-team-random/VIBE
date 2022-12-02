import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { fetchTopTracks } from "../redux/discover";
import { useDispatch, useSelector } from "react-redux";
import SongCard from "./SongCard";

const Discover = (props) => {
  const [genre, setGenre] = useState("");
  const dispatch = useDispatch();

  let token = window.localStorage.getItem("token");
  useEffect(() => {
    dispatch(fetchTopTracks(genre, token));
  }, [genre]);

  const { tracks } = useSelector((state) => state.discover);
  const genres = [
    "hip-hop",
    "pop",
    "rock",
    "country",
    "latin",
    "r&b",
    "indie",
    "edm",
    "k-pop",
    "jazz",
  ];

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-semibold text-3xl text-white text-left">
          Discover
        </h2>
        {genres.map((genre, i) => {
          return (
            <div key={i} onClick={() => setGenre(genre)} className="m-10">
              {genre}
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {tracks
          ? tracks.map((track, i) => {
              return <SongCard key={i} track={track} />;
            })
          : ""}
      </div>
      <div></div>
    </div>
  );
};

export default Discover;
