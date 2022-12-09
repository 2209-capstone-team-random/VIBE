import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Bee from '../../assets/bee.png';
import Card from '../Cards/Card';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { fetchUserArtists } from '../../redux/Spotify/userTopArtists';
import { fetchUserTracks } from '../../redux/Spotify/userTopTracks';

const OnBoard = ({ session, token }) => {
  const dispatch = useDispatch();
  const { genre } = useSelector((state) => state);
  // const { user } = useSelector((state) => state);
  const count = useSelector((state) => state);
  const video =
    'https://llxcoxktsyswmxmrwjsr.supabase.co/storage/v1/object/public/video/background.mp4';

  let userId = session?.user.id;
  let spotifyId = session?.user.user_metadata.name;
  let spotifySub = session?.user.user_metadata.sub;

  const navigate = useNavigate();
  const allTracks = useSelector((store) => store.userTopTracks.items);
  const allArtists = useSelector((store) => store.userTopArtists.items);

  const bounceTransition = {
    y: {
      duration: 1,
      yoyo: Infinity,
      ease: 'easeOut',
    },
  };

  const updateUser = async (id, spotifyId, display_name) => {
    try {
      const { data: user } = await supabase
        .from('User')
        .update({ spotifyId, display_name })
        .eq('id', id);
    } catch (error) {
      console.log(error);
    }
  };

  const insertTop = async (userSpotify, topArtists, topTracks) => {
    console.log('I AM HERE BEFORE TRY');
    try {
      const { data, error } = await supabase
        .from('User_Top_Lists')
        .insert([{ userSpotify, topArtists, topTracks }]);
      console.log('I AM EXECUTED');
    } catch (error) {
      console.log(error);
    }
  };

  const addCategories = async (userSpotify, catA, catB, catC) => {
    try {
      let { data, error } = await supabase
        .from('User_Top_Cat')
        .insert([{ userSpotify, catA, catB, catC }])
        .select();
      console.log('data', data);
    } catch (error) {
      console.log(error);
    }
  };

  const onBoarding = async (id) => {
    const { data, error } = await supabase
      .from('User')
      .update({ isFirstTimeUser: false })
      .match({ id });
    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      updateUser(userId, spotifySub, spotifyId);
    }
  }, [userId]);

  useEffect(() => {
    dispatch(fetchUserArtists(token));
    dispatch(fetchUserTracks(token));
  }, [token]);

  // useEffect(() => {
  //   if (allArtists?.length > 0 || allTracks?.length > 0) {
  //     insertTop(spotifyId, allArtists, allTracks);
  //   }
  // }, [allTracks]);

  const clickHandler = () => {
    //set first time user status to false
    onBoarding(userId);
    //adding cat to first time user
    addCategories(spotifyId, genre[0], genre[1], genre[2]);
    //rerouting
    navigate(`/profile/${spotifySub}`);
    //insert spotify data into DB
    insertTop(spotifyId, allArtists, allTracks);
  };
  return (
    <div className="w-full h-screen relative">
      <video
        className="bg-cover w-full h-full object-cover"
        src={video}
        autoPlay
        loop
        muted
      />
      <div className="absolute top-0 w-full h-full flex flex-col justify-center text-center text-white p-4 bg-gray-900/30">
        <div className="absolute inset-x-0 top-0">
          <motion.span
            transition={bounceTransition}
            animate={{ y: ['6%', '-7%'] }}
            className="flex justify-center item-center"
          >
            <img src={Bee} className="object-contain h-50 w-96 " alt="logo" />
          </motion.span>
          <h1 className="p-5 md:text-4xl font-bold">
            Welcome To Vibe, please pick your TOP 3 Categories
          </h1>
        </div>
        <div className="flex justify-center">
          <Card />
        </div>

        <div
          className={
            count.count !== 3 ? 'hidden' : 'absolute inset-x-0 bottom-5'
          }
        >
          <button
            className="m-2 h-12 px-5 text-lg border-hidden  text-white rounded-xl transition-all duration-500 bg-gradient-to-tl from-blue-500 via-sky-300 to-blue-500 bg-size-200 bg-pos-0 hover:bg-pos-100"
            onClick={clickHandler}
          >
            LET'S VIBE
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnBoard;
