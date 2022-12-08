import React, { useState, useEffect } from "react";
import { fetchTopTracks, fetchUserGenre } from "../../redux/Spotify/discover";
import { useDispatch, useSelector } from "react-redux";
import SongCard from "./SongCard";
import UserCard from "./UserCard";
import Player from "../Home/Player";
import NavBar from "../Home/Navbar";

const Discover = ({ token }) => {
  const dispatch = useDispatch();

  const [genre, setGenre] = useState(null);

  useEffect(() => {
    dispatch(fetchUserGenre(genre));
    dispatch(fetchTopTracks(genre, token));
  }, [genre]);

  const { list } = useSelector((state) => state.discover);
  const { users } = useSelector((state) => state.discover);

  const genres = [
    "hip-hop",
    "pop",
    "rock",
    "country",
    "latin",
    "indie",
    "edm",
    "r-n-b",
  ];

  return (
    <div className="flex flex-col bg-blu ">
      <NavBar />
      <h2 className="font-semibold text-3xl justify-center flex text-black text-left">
        Discover
      </h2>
      <div className="w-full shadow-xl bg-white p-10 flex flex-wrap justify-center sm:flex-row flex-col m-3 font-semibold">
        {genres.map((genre, i) => {
          return (
            <div
              key={i}
              onClick={() => setGenre(genre)}
              className="flex justify-center items-center mask mask-squircle w-[130px] p-2 h-[130px] bg-blue-400 hover:bg-blue-300"
            >
              <div className=" "> {genre}</div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap justify-center m-10 p-10 rounded-2xl gap-8 ">
        {users.length ? <h2>Future Vibes</h2> : ""}
        {users
          ? users.map((user, i) => {
              return (
                <div key={i}>
                  <UserCard
                    className="flex justify-center px-4 py-16 bg-base-200"
                    key={i}
                    user={user}
                  />
                </div>
              );
            })
          : ""}
      </div>
      <h2 className="p-3 m-3 text-3xl">{genre}</h2>
      <div className="flex flex-wrap justify-center m-10 p-10 rounded-2xl gap-8 ">
        {list.tracks
          ? list.tracks.map((track, i) => {
              return <SongCard token={token} key={i} track={track} />;
            })
          : ""}
      </div>
      <div className=" bg-black/30">
        {" "}
        <Player token={token} />
      </div>
    </div>
  );
};

export default Discover;
