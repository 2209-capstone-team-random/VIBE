import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Landing from '../components/Login/Landing';
import { getUser } from '../redux/dbQueryThunks/user';
import OnBoard from '../components/Login/OnBoard';
import { supabase } from '../supabaseClient';
import axios from 'axios';
import AUTH_URL from './Auth_Url';
import CurrentUserProfile from '../components/Home/currentUserProfile';
import NavBar from '../components/Home/Navbar';

export default function Auth() {
  const [token, setToken] = useState('');
  const [isFirstTime, setIsFirstTime] = useState(true);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);

  const checkUserState = () => {
    if (user[0].isFirstTimeUser === false) {
      setIsFirstTime(false);
    }
  };

  //load user info on pageload and run checkUserStat
  useEffect(() => {
    dispatch(getUser(10));
  }, []);

  useEffect(() => {
    if (user !== null) {
      checkUserState();
    }
  }, [user]);

  useEffect(() => {
    // Set Token and store in Local Storage
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');

    if (!token && hash) {
      let urlParams = new URLSearchParams(hash.replace('#', '?'));
      token = urlParams.get('access_token');
      window.location.hash = '';
      window.localStorage.setItem('token', token);
    }
    setToken(token);
  }, []);

  // //need user Id

  // Remove Token from Local Storage
  const logout = () => {
    setToken('');
    window.localStorage.removeItem('token');
    const handleLogin = async (e) => {
      e.preventDefault();

      try {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) throw error;
        alert('Check your email for the login link!');
      } catch (error) {
        alert(error.error_description || error.message);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div>
        {token && isFirstTime ? (
          <OnBoard />
        ) : token && !isFirstTime ? (
          <Home logout={logout} token={token} />
        ) : (
          <Landing />
        )}
      </div>
    );
  };
}
