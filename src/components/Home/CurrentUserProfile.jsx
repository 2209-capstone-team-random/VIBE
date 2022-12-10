import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TopPlaylists from './TopPlaylists';
import SpotifyPlayer from 'react-spotify-web-playback';
import { fetchUserByIdPlaylists } from '../../redux/Spotify/userPlaylists';
import NameBio from './NameBio';
import WallPosts from './WallPosts';
import NavBar from './Navbar';
import { useParams } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

export default function CurrentUserProfile({ token, session }) {
  const dispatch = useDispatch();
  const { items } = useSelector((store) => store.userPlaylists);
  const { userId } = useParams();
  const [vibe, setVibe] = useState(false);
  const [mutual, setMutual] = useState(false);
  const mySpotifySub = session?.user.user_metadata.sub;

  const vibeHandler = () => {
    if (vibe === false) {
      setVibeTrue(mySpotifySub, userId);
    } else if (vibe === true && mutual === false) {
      removeVibe(mySpotifySub, userId);
      setVibe(false);
    } else if (vibe === true && mutual === true) {
      removeVibe(mySpotifySub, userId);
      removeMutual(userId, mySpotifySub);
      setVibe(false);
      setMutual(false);
    }
  };
  //first case - 1 way they did not vibe with u, then add row

  const setVibeTrue = async (userSpotify, vibeSpotify) => {
    try {
      const { data, error } = await supabase
        .from('Vibe')
        .insert([{ userSpotify, vibeSpotify, mutual: false }]);
      checkMyVibe(userSpotify, vibeSpotify);
    } catch (error) {
      console.log(error);
    }
  };
  //second case - 1 way vibe and check if they vibe u, then invoke mutual function

  const setMutualStatus = async (userSpotify, vibeSpotify) => {
    try {
      let { data: userA } = await supabase
        .from('Vibe')
        .update({ mutual: 'true' })
        .match({ userSpotify, vibeSpotify });
      let { data: userB } = await supabase
        .from('Vibe')
        .update({ mutual: 'true' })
        .match({ userSpotify: vibeSpotify, vibeSpotify: userSpotify });
    } catch (error) {
      console.log(error);
    }
  };

  //third case - remove vibe, remove row if no mutual, remove row

  const removeVibe = async (userSpotify, vibeSpotify) => {
    try {
      const { data, error } = await supabase
        .from('Vibe')
        .delete()
        .match({ userSpotify, vibeSpotify });
    } catch (error) {
      console.log(error);
    }
  };

  //forth case - remove vibe, if mutual, set other mutual to false and remove row
  const removeMutual = async (userSpotify, vibeSpotify) => {
    try {
      const { data, error } = await supabase
        .from('Vibe')
        .update({ mutual: false })
        .match({ userSpotify, vibeSpotify })
        .select();
      if (data) {
        console.log(data);
      }
      if (error) {
        console.log(error);
      }
      console.log('testing');
    } catch (error) {
      console.log(error);
    }
  };

  const checkMyVibe = async (userSpotify, vibeSpotify) => {
    try {
      const { data: vibe, error } = await supabase
        .from('Vibe')
        .select('*')
        .match({ userSpotify, vibeSpotify });
      const { data: theirVibe } = await supabase
        .from('Vibe')
        .select('*')
        .match({ userSpotify: vibeSpotify, vibeSpotify: userSpotify });
      if (vibe.length > 0) {
        setVibe(true);
        if (theirVibe.length > 0) {
          setMutual(true);
          setMutualStatus(userSpotify, vibeSpotify);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkMyVibe(mySpotifySub, userId);
  }, [mySpotifySub]);

  useEffect(() => {
    dispatch(fetchUserByIdPlaylists(userId, token));
  }, [token]);

  if (items) {
    return (
      <div className="flex flex-col justify-center items-center">
        <NavBar session={session} />
        <div></div>

        <NameBio session={session} userId={userId} />
        {userId !== mySpotifySub ? (
          mutual ? (
            <button
              className="mb-20 h-10 px-5 text-lg border-hidden  text-white rounded-xl transition-all duration-500 bg-gradient-to-tl from-pink-300 via-orange-300 to-pink-300 bg-size-200 bg-pos-0 hover:bg-pos-100"
              onClick={vibeHandler}
            >
              V I B E E !
            </button>
          ) : !vibe ? (
            <button
              className="mb-20 h-10 px-5 text-lg border-hidden  text-white rounded-xl transition-all duration-500 bg-gradient-to-tl from-purple-300 via-blue-300 to-purple-300 bg-size-200 bg-pos-0 hover:bg-pos-100"
              onClick={vibeHandler}
            >
              V I B E with Me!
            </button>
          ) : (
            <button
              className="mb-20 h-10 px-5 text-lg border-hidden  text-white rounded-xl transition-all duration-500 bg-gradient-to-tl from-purple-300 via-blue-300 to-purple-300 bg-size-200 bg-pos-0 hover:bg-pos-100"
              onClick={vibeHandler}
            >
              V I B E D
            </button>
          )
        ) : (
          <></>
        )}
        <TopPlaylists session={session} token={token} />
        <WallPosts session={session} mutual={mutual} />
        <div className="fixed z-10 bottom-0 mt-10 w-full">
          <SpotifyPlayer token={token} uris={items.map((item) => item.uri)} />
        </div>
      </div>
    );
  }
  console.log('Sorry, we could not load your profile.');
}
