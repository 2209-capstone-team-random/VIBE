import React from "react";
import { Link } from "react-router-dom";
import VibesList from "./VibesList.jsx";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Drawer({ children, isOpen, setIsOpen, userId }) {
  const nav = useNavigate();
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    // nav("/");
  };
  return (
    <main
      className={
        " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 translate-x-full  ")
      }
    >
      <section
        className={
          " w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
          <header className="p-4 font-bold text-lg">Header</header>
          {children}
          <Link to="/editProfile">
            <p className="justify-between p-4">Edit Profile</p>
          </Link>
          <VibesList userId={userId} />

          <button onClick={signOut}>Sign Out</button>
        </article>
      </section>
      <button
        className="fixed top-5 right-5"
        onClick={() => {
          setIsOpen(false);
          nav("/");
        }}
      >
        X
      </button>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
}
