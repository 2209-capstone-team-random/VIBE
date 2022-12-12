import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, EffectFade } from "swiper";
import "../../styles/index.css";
import { supabase } from "../../supabaseClient";
import { useParams } from "react-router-dom";
import { fetchUri } from "../../redux/Spotify/discover";

export default function TopTracks({ token }) {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const [tracks, setTracks] = useState([]);
  const handleClick = (uri) => {
    dispatch(fetchUri(uri, token));
  };
  const fetchTracks = async () => {
    const { data, error } = await supabase
      .from("User_Top_Lists")
      .select("topTracks")
      .eq("userSpotify", userId);
    const parsedTracks = data[0].topTracks.map((trackInfo) => {
      return JSON.parse(trackInfo);
    });
    setTracks(parsedTracks);
  };
  useEffect(() => {
    fetchTracks();
  }, []);

  if (tracks) {
    return (
      <div className="p-2">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="container p-6 rounded-lg shadow-lg h-96 w-60 bg-gradient-to-r  from-blue-200 to-cyan-200"
        >
          <div>
            {tracks.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <h1 className="dark:text-black text-center text-lg font-semibold mt-2">
                    Top Tracks
                  </h1>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleClick(item.uri)}
                  >
                    <img src={item.album.images[0].url} className="p-4" />
                  </div>
                  <p className="dark:text-black text-center font-semibold mt-4">
                    {item.name}
                  </p>
                  <p className="dark:text-black text-center mb-2">
                    {item.artists[0].name}
                  </p>
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>
      </div>
    );
  }
  console.log("Sorry, there are no tracks");
}
