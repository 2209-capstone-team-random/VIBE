import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Drawer from '../../Drawer';
import Discover from '../Discover/Discover';

export default function NavBar({ userId }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="navbar bg-blue-50 mb-8">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Discover</a>
            </li>
          </ul>
        </div>
        <Link to={`/`}>
          <a className="btn btn-ghost normal-case text-2xl">V I B E</a>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link to="/discover">
              <a className="font-bold">Discover</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end"></div>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div onClick={() => setIsOpen(!isOpen)} className="w-10 rounded-full">
            <img src="https://i.pinimg.com/564x/67/e5/bb/67e5bba8b7e5d23c035bb7b0595581d0.jpg" />
          </div>
        </label>
      </div>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} userId={userId}></Drawer>
    </div>
  );
}
