import React, { useState, useEffect } from "react";
import { fetchTopTracks, fetchUserGenre } from "../../redux/Spotify/discover";
import { useDispatch, useSelector } from "react-redux";
import SongCard from "./SongCard";
import UserCard from "./UserCard";
import Player from "../Home/Player";
import { supabase } from "../../supabaseClient";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Discover = ({ token, session }) => {
  const user = session?.user?.user_metadata?.name;

  const dispatch = useDispatch();

  const [pickedGenre, setPickedGenre] = useState(null);
  const [categories, setCategories] = useState([]);
  const [displayName, setDisplayName] = useState(null);

  useEffect(() => {
    const fetchCatagories = async () => {
      const { data } = await supabase.from("Categories").select();
      setCategories(data);
    };

    dispatch(fetchUserGenre(pickedGenre));
    dispatch(fetchTopTracks(pickedGenre, token));
    fetchCatagories();
  }, [pickedGenre]);

  const handleClick = async (genre) => {
    setPickedGenre(
      genre.name.toLowerCase() === "r&b" ? "r-n-b" : genre.name.toLowerCase()
    );
    setDisplayName(genre.name);
  };

  const { list } = useSelector((state) => state.discover);
  const { users } = useSelector((state) => state.discover);

  return (
    <div className="flex flex-col bg-white  ">
      <h2 className="font-semibold text-3xl justify-center flex m-3 p-3 text-black text-left">
        Discover
      </h2>
      <div className=" sticky shadow-xl flex flex-wrap justify-center rounded-full items-center m-3 sm:flex-row flex-col px-8 bottom-0 z-30  bg-blur">
        {categories.map((genre, i) => {
          return (
            <div
              key={i}
              onClick={() => handleClick(genre)}
              className={
                pickedGenre === genre.name
                  ? `scale-80  ${genre.color} p-5 rounded-lg w-40 group `
                  : `transition ease-in-out m-3 delay-0 ${genre.color} shadow-2xl hover:scale-105 duration-300 p-3 rounded-lg w-[130px] group `
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
      {users.length ? (
        <h2 className="p-3 animate-bounce mt-6 text-5xl text-center font-bold">
          Future Vibees
        </h2>
      ) : (
        ""
      )}
      <Swiper
        spaceBetween={1}
        slidesPerView={1}
        navigation
        scrollbar={{ draggable: true }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className={
          !users.length
            ? "flex flex-wrap w-full m-10 p-10 rounded-2xl gap-8"
            : "flex flex-wrap w-[95%] justify-center m-10 p-10 rounded-2xl gap-8 shadow-xl bg-gray-100"
        }
      >
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
      </Swiper>
      <h2 className="p-3 animate-bounce m-3 text-5xl text-center font-bold">
        {displayName}
      </h2>
      <div
        className={
          !list.tracks
            ? "flex flex-wrap justify-center m-10 p-10 rounded-2xl gap-8"
            : "flex flex-wrap justify-center m-10 p-10 rounded-2xl gap-8 bg-blue-100 shadow-2xl"
        }
      >
        {list.tracks
          ? list.tracks.map((track, i) => {
              return (
                <SongCard token={token} user={user} key={i} track={track} />
              );
            })
          : ""}
      </div>{" "}
      <Player className="sticky bottom-0 z-99" token={token} />
    </div>
  );
};

export default Discover;
