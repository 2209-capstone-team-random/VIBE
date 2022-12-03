import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserTracks } from "../../redux/Spotify/userTopTracks";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, EffectFade } from "swiper";
import "../../styles/index.css";

export default function TopTracks(props) {
  const dispatch = useDispatch();
  const { items } = useSelector((store) => store.userTopTracks);
  const token = props.token;
  // console.log("Top Tracks", items);

  useEffect(() => {
    dispatch(fetchUserTracks(token));
  }, []);
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
                  <img src={item.album.images[0].url} className="p-4" />
                  <p className="text-center font-semibold mt-4">{item.name}</p>
                  <p className="text-center">{item.artists[0].name}</p>
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>
      </div>
    );
  }
}
