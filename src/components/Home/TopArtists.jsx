import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserArtists } from "../../redux/Spotify/userTopArtists";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import "../../styles/index.css";
import TopTracks from "./TopTracks";

export default function TopArtists(props) {
  const dispatch = useDispatch();
  const { items } = useSelector((store) => store.userTopArtists);
  const token = props.token;
  // console.log("TopArtists", items);

  useEffect(() => {
    dispatch(fetchUserArtists(token));
  }, []);

  if (items) {
    return (
      <div className="">
        <div className="mt-10">
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className="container left-96 block p-6 rounded-lg shadow-lg w-60 bg-gradient-to-r from-blue-200 to-cyan-200"
          >
            <div className="">
              {items.map((item) => {
                return (
                  <SwiperSlide className="" key={item.id}>
                    <img
                      src={item.images[0].url}
                      className="rounded-full resize h-60 w-60 p-4"
                    />
                    <p className="text-center font-semibold p-4">{item.name}</p>
                  </SwiperSlide>
                );
              })}
            </div>
          </Swiper>
        </div>
        <TopTracks token={token} />
      </div>
    );
  }
}
