import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { Link } from 'react-router-dom';

const VibesList = ({ vibes }) => {
  // console.log(vibes);
  return (
    <ul>
      <li>test</li>
      {vibes.map((vibe) => {
        return (
          <Link key={vibe.id} to={`../profile/${vibe.vibeSpotify}`}>
            {vibe.vibeSpotify}
          </Link>
        );
      })}
    </ul>
  );
};

export default VibesList;
