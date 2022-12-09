import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, EffectFade } from 'swiper';
import '../../styles/index.css';
import { supabase } from '../../supabaseClient';
import { useParams } from 'react-router-dom';

export default function TopArtists({ token }) {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const [artists, setArtists] = useState([]);

  const fetchArtists = async () => {
    const { data, error } = await supabase
<<<<<<< HEAD
      .from('User_Top_Lists')
      .select('topArtists')
      .eq('userSpotify', 'anq90wy056xea5rp2tbmh7ce3');
    // console.log("DATA", data);
=======
      .from("User_Top_Lists")
      .select("topArtists")
      .eq("userSpotify", userId);
    console.log("DATA", data);
>>>>>>> main
    const parsedArtists = data[0].topArtists.map((artistInfo) => {
      return JSON.parse(artistInfo);
    });
    setArtists(parsedArtists);
  };
  useEffect(() => {
    fetchArtists();
  }, []);
<<<<<<< HEAD
  // console.log("ARTISTS", artists);
=======
>>>>>>> main

  if (artists) {
    return (
      <div className="p-2">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="container p-6 rounded-lg shadow-lg h-96 w-60 bg-gradient-to-r from-blue-200 to-cyan-200"
        >
          <div>
            {artists.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <h1 className="text-center text-lg font-semibold mt-2">
                    Top Artists
                  </h1>
                  <img src={item.images[0].url} className="p-4 h-60 w-60" />
                  <p className="text-center font-semibold mt-4">{item.name}</p>
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>
      </div>
    );
  }
  console.log('Sorry, there are no artists');
}
