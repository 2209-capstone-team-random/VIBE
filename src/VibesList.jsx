import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const VibesList = (props) => {
  return (
    <ul>
      <li>test</li>
      {/* {vibes.map((vibe) => {
        <li>{vibe}</li>;
      })} */}
    </ul>
  );
};

export default VibesList;
