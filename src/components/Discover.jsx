import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { fetchTopTracks, fetchUserGenre } from "../redux/discover";
import { useDispatch, useSelector } from "react-redux";
import SongCard from "./SongCard";
import UserCard from "./UserCard";
import { list } from "postcss";

const Discover = () => {
  const [genre, setGenre] = useState(null);
  const dispatch = useDispatch();

  let token = window.localStorage.getItem("token");
  useEffect(() => {
    dispatch(fetchUserGenre(genre));
    dispatch(fetchTopTracks(genre, token));
  }, [genre]);

  const { list } = useSelector((state) => state.discover);
  const { users } = useSelector((state) => state.discover);
  console.log(users);
  const genres = [
    "hip-hop",
    "pop",
    "rock",
    "country",
    "latin",
    "r&b",
    "indie",
    "edm",
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
      <div className="flex flex-wrap justify-center m-4 gap-8 ">
        {users
          ? users.map((user) => {
              return <UserCard user={user} />;
            })
          : ""}
      </div>
      <h2 className="text-3xl">{genre}</h2>
      <div className="flex flex-wrap justify-center m-4 gap-8 ">
        {list.tracks
          ? list.tracks.map((track, i) => {
              return <SongCard key={i} track={track} />;
            })
          : ""}
      </div>
    </div>
  );
};

export default Discover;
