import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className="flex w-full justify-between item-center h-20 px-4 absolute z-10 text-white">
      <div>
        <h1>VIBE.</h1>
        <img className="absolute" src="../assets/bee.png" alt=""></img>
      </div>
      <ul className="hidden md:flex">
        {/* <li>HOME</li>
        <li>Connections</li>
        <li>Listen</li>
        <li>About Us</li> */}
      </ul>
      <div>
        <ul className="hidden md:flex"></ul>
      </div>
      {/* Hamburger */}
      <div onClick={handleNav} className="md:hidden z-10">
        {/* using navstate to display x and hamburger */}
        {nav ? (
          <AiOutlineClose className="text-black" size={20} />
        ) : (
          <HiOutlineMenuAlt4 size={20} />
        )}
      </div>
      {/* mobile menu dropdown */}
      <div
        onClick={handleNav}
        className={
          nav
            ? "absolute text-black left-0 top-0 w-full bg-gray-100/90 px-4 py-7 flex flex-col"
            : "absolute left-[-100%]"
        }
      >
        <ul>
          <h1>VIBE.</h1>
          <li className="border-b">HOME</li>
          <li className="border-b">Connections</li>
          <li className="border-b">Listen</li>
          <li className="border-b">About Us</li>
          <div className="flex flex-col">
            <button>Account</button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
