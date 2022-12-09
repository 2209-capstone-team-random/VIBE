import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const VibesList = ({ userId }) => {
  const [vibes, setVibest] = useState([]);

  const getVibest = async () => {
    const { data } = await supabase
      .from('Vibe')
      .select('vibeSpotify')
      .match({ userSpotify: userId, mutual: true });
    console.log(data);
  };

  // useEffect(() => {

  // });
  return <button onClick={getVibest}>x</button>;
};

export default VibesList;
