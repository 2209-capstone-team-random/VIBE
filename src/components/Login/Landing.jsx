import React, { useState, useEffect } from 'react';
import video from '../../assets/connect2.mp4';
import Typed from 'react-typed';
import Bee from '../../assets/bee.png';
import LoginButton from './LoginButton';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const Landing = ({ token, session }) => {
  async function handleClick() {
    // let { data: User, error } = await supabase.from('User').select('*');
    const guy = await supabase.auth.getUser();
    //update wall post
    // const { data, error } = await supabase
    //   .from('Wall_Post')
    //   .update({ body: 'updated' })
    //   .match({ userSpotify: 'jerryhwu', posterSpotify: 'henrycard' });
    //insert user top cat
    const { data, error } = await supabase.from('User_Top_Cat').insert([
      {
        catA: 'someValue',
        catB: 'otherValue',
        catC: 'test value',
        userSpotify: 'henrycard',
      },
    ]);
    //upload file
    // [image, setImage] = useState(null)
    // file input on change e=> setImage (e.target.files[0])
    // form onSubmit
    //if image
    // const {data} = await supabase.storage.from('profile-images').upload(`userSpotify-profile-image`, image)

    // if (error) {
    // console.log(data);
    // }
    // console.log(guy.data.user.id);
  }
  // const navigate = useNavigate();
  // //spotify token
  // let [token, setToken] = useState(null);

  // useEffect(() => {
  //   const spotifyToken = JSON.parse(
  //     window.localStorage.getItem('sb-llxcoxktsyswmxmrwjsr-auth-token')
  //   )?.provider_token;
  //   setToken(spotifyToken);
  //   if (token) {
  //     navigate('/profile');
  //   }
  // }, [token]);

  // if (spotifyToken) {
  //   setToken(spotifyToken);
  //   navigate('/profile');
  // }
  // console.log(token);
  return (
    <div className="w-full h-screen relative">
      <video
        className="bg-cover w-full h-full object-cover"
        src={video}
        autoPlay
        loop
        muted
      />
      <div className="absolute top-0 w-full h-full flex flex-col justify-center text-center text-white p-4 bg-gray-900/50 select-none">
        <div className="flex justify-center item-center">
          <img src={Bee} className="object-contain h-50 w-96 " alt="logo" />
        </div>
        <h1 className="text-8xl ">V I B E</h1>
        <Typed
          className="text-4xl md:text-4xl font-bold"
          strings={['Discover.', 'Listen.', 'Connect.']}
          typeSpeed={80}
          backSpeed={80}
          loop
        />
        <LoginButton token={token} />
        <button onClick={handleClick}>test</button>
      </div>
    </div>
  );
};

export default Landing;
