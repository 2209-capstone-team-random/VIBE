import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { Link, useNavigate } from 'react-router-dom';

const VibesList = ({ vibes, ownId }) => {
  const navigate = useNavigate();
  return (
    <>
      <h2 className="grid ml-2">VIBEES!</h2>
      <ul className="menu bg-base-100 w-56 dark:bg-zinc-600 ">
        <li key={'homelink'}>
          <a href={`../profile/${ownId}`}>Home</a>
        </li>
        {vibes.map((vibe) => {
          return (
            <li key={vibe.id}>
              <a href={`../profile/${vibe.vibeSpotify}`}>{vibe.vibeSpotify}</a>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default VibesList;
