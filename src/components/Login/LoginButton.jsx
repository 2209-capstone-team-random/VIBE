import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

const LoginButton = () => {
  let [token, setToken] = useState('');
  async function signInWithSpotify() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'spotify',
        options: {
          scopes: `ugc-image-upload
    user-modify-playback-state
    user-read-playback-state
    user-read-currently-playing
    streaming
    app-remote-control
    user-library-modify
    user-library-read
    user-top-read
    user-read-email
    user-read-private
    user-read-playback-position
    user-read-recently-played
    user-follow-read
    user-follow-modify
    playlist-read-private
    playlist-read-collaborative
    playlist-modify-public
    playlist-modify-private`,
        },
      });
      setToken(data);
    } catch (error) {
      console.err(error);
    }
  } 
 

  return (
    <div className="p-7">
      <button
        className="m-2 h-12 px-5 text-lg border-hidden  text-white rounded-xl transition-all duration-500 bg-gradient-to-tl from-blue-500 via-sky-300 to-blue-500 bg-size-200 bg-pos-0 hover:bg-pos-100"
        onClick={signInWithSpotify}
      >
        Login with Spotify
      </button>
    </div>
  );
};

export default LoginButton;
