import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserTracks } from "../../redux/Spotify/userTopTracks";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, EffectFade } from "swiper";
import "../../styles/index.css";

export default function TopTracks({ token }) {
  const dispatch = useDispatch();
  const { items } = useSelector((store) => store.userTopTracks);

  useEffect(() => {
    dispatch(fetchUserTracks(token));
  }, [token]);
  if (items) {
    return (
      <div className="mt-4">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="container left-96 block p-6 rounded-lg shadow-lg w-60 bg-gradient-to-r from-blue-200 to-cyan-200"
        >
          <div>
            {items.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <h1 className="text-center text-lg font-semibold mt-2">
                    Top Tracks
                  </h1>
                  <img src={item.album.images[0].url} className="p-4" />
                  <p className="text-center font-semibold mt-4">{item.name}</p>
                  <p className="text-center mb-2">{item.artists[0].name}</p>
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
