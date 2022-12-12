import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Drawer from "../../Drawer";

export default function NavBar({ userId, session }) {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", JSON.stringify(theme));
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const sun = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 dark:text-black"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </svg>
  );

  const moon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="white"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
      />
    </svg>
  );

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="navbar bg-blue-50 dark:hover:gray/10 dark:bg-gray-600">
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
            <Link to="/discover">
              <li>Discover</li>
            </Link>
          </ul>
        </div>
        <Link to={`/`}>
          <p className="btn btn-ghost normal-case text-2xl">V I B E</p>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link to="/discover">
              <p className="font-bold">Discover</p>
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end"></div>
      <button
        type="button"
        onClick={handleThemeSwitch}
        className=" p-2 m-2 z-10 right-20 top-4 bg-violet-300 dark:bg-orange-300 text-lg rounded-md"
      >
        {theme === "dark" ? sun : moon}
      </button>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div onClick={() => setIsOpen(!isOpen)} className="w-10 rounded-full">
            <img src="https://i.pinimg.com/564x/67/e5/bb/67e5bba8b7e5d23c035bb7b0595581d0.jpg" />
          </div>
        </label>
      </div>

      <Drawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        userId={userId}
        session={session}
      ></Drawer>
    </div>
  );
}
