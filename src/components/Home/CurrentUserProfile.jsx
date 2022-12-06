import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, EffectFade } from 'swiper';
import '../../styles/index.css';
import TopArtists from './TopArtists';
import SpotifyPlayer from 'react-spotify-web-playback';
import { fetchUserTracks } from '../../redux/Spotify/userTopTracks';
import NameBio from './NameBio';
import WallPosts from './WallPosts';
import NavBar from './Navbar';
import { useNavigate } from 'react-router-dom';

export default function CurrentUserProfile(props) {
  let navigate = useNavigate();
  const token = props.token;
  const dispatch = useDispatch();
  const { items } = useSelector((store) => store.userTopTracks);
  console.log('Top Tracks', token);

  useEffect(() => {
    // if (!props.session) {
    //   navigate('/');
    // }
    dispatch(fetchUserTracks(token));
  }, [token]);

  let uris = items ? items.map((item) => item.uri) : 'sorry';
  console.log(uris);
  if (items) {
    return (
      <div className="grid justify-items-center">
        <NavBar />
        <NameBio />
        <TopArtists token={token} />
        <div className="sticky z-50 bottom-0 mt-10">
          <SpotifyPlayer token={token} uris={items.map((item) => item.uri)} />
        </div>
      </div>
    );
  }
}
