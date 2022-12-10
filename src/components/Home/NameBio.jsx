import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../redux/dbQueryThunks/user';

export default function NameBio({ session, userId }) {
  const dispatch = useDispatch();
  const display_name = session?.user.user_metadata.name;
  const [userData, setUserData] = useState('');
  const [userImg, setUserImg] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase
        .from('User')
        .select('*')
        .eq('spotifyId', userId);
      setUserData(data);
    };
    getUser();

    const getImg = async () => {
      const { data, error } = await supabase
        .from('Profile_Image')
        .select('url')
        .eq('userSpotify', userId);
      setUserImg(data);
    };
    getImg();
  }, []);

  return (
    <div className="flex flex-row mx-20 mt-20">
      <div className="avatar online h-40">
        <div className="rounded-full">
          <img src={userImg[0]?.url} />
        </div>
      </div>
      <div className="flex-column ml-20">
        <p className="font-semibold text-lg mb-4">
          {userData[0]?.display_name}
        </p>
        <p className="mb-4">{userData[0]?.bio}</p>
      </div>
    </div>
  );
}
