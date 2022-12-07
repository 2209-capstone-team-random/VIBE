import React, { useState, useEffect } from "react";
import { fetchTopTracks, fetchUserGenre } from "../../redux/Spotify/discover";
import { useDispatch, useSelector } from "react-redux";
import SongCard from "./SongCard";
import UserCard from "./UserCard";
import Player from "../Home/Player";
import { supabase } from "../../supabaseClient";

const Discover = ({ token, session }) => {
  const user = session?.user?.user_metadata?.name;

  const dispatch = useDispatch();

  const [pickedGenre, setPickedGenre] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCatagories = async () => {
      const { data } = await supabase.from("Categories").select();
      setCategories(data);
    };
    dispatch(fetchUserGenre(pickedGenre));
    dispatch(fetchTopTracks(pickedGenre, token));
    fetchCatagories();
  }, [pickedGenre]);

  const { list } = useSelector((state) => state.discover);
  const { users } = useSelector((state) => state.discover);

  return (
    <div className="flex flex-col bg-blue-100  ">
      <h2 className="font-semibold text-3xl justify-center flex m-3 p-3 text-black text-left">
        Discover
      </h2>
      <div className="w-full sticky shadow-xl flex flex-wrap justify-center rounded-full items-center sm:flex-row flex-col px-8 top-0 z-30  ">
        {categories.map((genre, i) => {
          return (
            <div
              key={i}
              onClick={() =>
                setPickedGenre(
                  genre.name.toLowerCase() === "r&b"
                    ? "r-n-b"
                    : genre.name.toLowerCase()
                )
              }
              className={
                pickedGenre === genre.name
                  ? `scale-80  ${genre.color} p-5 rounded-lg w-40 group `
                  : `transition ease-in-out m-3 delay-0 ${genre.color} shadow-2xl hover:scale-105 duration-300 p-3 rounded-lg w-40 group `
              }
            >
              <img src={genre.img} className="w-full rounded shadow" />
              <h3 className="text-gray-200 font-semibold mt-5">
                {" "}
                {genre.name}
              </h3>
            </div>
          );
        })}
      </div>

      <div
        className={
          !users.length
            ? "flex flex-wrap justify-center m-10 p-10 rounded-2xl gap-8"
            : "flex flex-wrap justify-center m-10 p-10 rounded-2xl gap-8 shadow-xl bg-white"
        }
      >
        {users.length ? <h2>Future Vibes</h2> : ""}
        {users
          ? users.map((user, i) => {
              return (
                <div key={i}>
                  <UserCard
                    className=" flex justify-center px-4 py-16 bg-base-200"
                    key={i}
                    user={user}
                  />
                </div>
              );
            })
          : ""}
      </div>
      <h2 className="p-3 m-3 text-3xl">{pickedGenre}</h2>
      <div
        className={
          !list.tracks
            ? "flex flex-wrap justify-center m-10 p-10 rounded-2xl gap-8"
            : "flex flex-wrap justify-center m-10 p-10 rounded-2xl gap-8 bg-white shadow-2xl"
        }
      >
        {list.tracks
          ? list.tracks.map((track, i) => {
              return (
                <SongCard token={token} user={user} key={i} track={track} />
              );
            })
          : ""}
      </div>
      <div className="">
        {" "}
        <Player token={token} />
      </div>
    </div>
  );
};

export default Discover;
