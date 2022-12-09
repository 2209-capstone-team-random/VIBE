import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const VibesList = ({ userId }) => {
  const [vibes, setVibes] = useState([]);

  useEffect(() => {
    const getVibest = async () => {
      // console.log(props);
      const { data } = await supabase
        .from('Vibe')
        .select('vibeSpotify')
        .match({ userSpotify: userId, mutual: true });
      if (vibes.length < 1) {
        setVibes(data);
      }
    };
  }, [vibes]);
  return <button>x</button>;
};

export default VibesList;
