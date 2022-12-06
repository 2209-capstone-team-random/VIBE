import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserArtists } from '../../redux/Spotify/userTopArtists';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';
import '../../styles/index.css';
import TopTracks from './TopTracks';
import TopGenres from './TopGenres';
import WallPosts from './WallPosts';

export default function TopArtists({token}) {
  const dispatch = useDispatch();
  const { items } = useSelector((store) => store.userTopArtists);

  // console.log("TopArtists", items);

  useEffect(() => {
    dispatch(fetchUserArtists(token));
  }, [token]);

  if (items) {
    return (
      <div className="flex">
        <WallPosts />
        <div>
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className="container left-96 block p-6 rounded-lg shadow-lg w-60 bg-gradient-to-r from-blue-200 to-cyan-200"
          >
            <div className="">
              {items.map((item) => {
                return (
                  <SwiperSlide className="" key={item.id}>
                    <h1 className="text-center text-lg font-semibold mt-2">
                      Top Artists
                    </h1>
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
          <TopTracks token={token} />
          <TopGenres />
        </div>
      </div>
    );
  }
}
