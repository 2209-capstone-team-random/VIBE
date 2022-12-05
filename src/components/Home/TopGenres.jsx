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

export default function TopTracks() {
  return (
    <div className="mt-4">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="container left-96 block p-6 rounded-lg shadow-lg w-60 bg-gradient-to-r from-blue-200 to-cyan-200"
      >
        <div>
          <SwiperSlide className="text-center font-semibold">
            <h1 className="text-center text-lg font-semibold mt-2">
              Top Genres
            </h1>
            <p>Genre 1</p>
          </SwiperSlide>
          <SwiperSlide className="text-center font-semibold">
            <h1 className="text-center text-lg font-semibold mt-2">
              Top Genres
            </h1>
            <p>Genre 2</p>
          </SwiperSlide>{" "}
          <SwiperSlide className="text-center font-semibold">
            <h1 className="text-center text-lg font-semibold mt-2">
              Top Genres
            </h1>
            <div className="">
              <p>Genre 3</p>
            </div>
          </SwiperSlide>
        </div>
      </Swiper>
    </div>
  );
}
