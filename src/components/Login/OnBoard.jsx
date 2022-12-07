import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Bee from "../../assets/bee.png";
import Card from "../Cards/Card";
import { motion } from "framer-motion";
import video from "../../assets/connect2.mp4";
import CategoryButton from "./CategoryButton";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const OnBoard = ({ session }) => {
  const navigate = useNavigate();
  const [isFirstTimeUser, setIsFirstTimeUser] = useState("");

  const bounceTransition = {
    y: {
      duration: 1,
      yoyo: Infinity,
      ease: "easeOut",
    },
  };

//   const userStatus = async (userId) => { 
//     const stat = await getUserStatus("36031b70-8739-4393-bcd3-ef082aebdfed"
//       )
//     console.log('stat',stat)
// }



  const count = useSelector((state) => state);


  return (
    <div className="w-full h-screen relative">
      <video
        className="bg-cover w-full h-full object-cover"
        src={video}
        autoPlay
        loop
        muted
      />
      <div className="absolute top-0 w-full h-full flex flex-col justify-center text-center text-white p-4 bg-gray-900/30">
        <div className="absolute inset-x-0 top-0">
          <motion.span
            transition={bounceTransition}
            animate={{ y: ["6%", "-7%"] }}
            className="flex justify-center item-center"
          >
            <img src={Bee} className="object-contain h-50 w-96 " alt="logo" />
          </motion.span>
          <h1 className="p-5 md:text-4xl font-bold">
            Welcome To Vibe, please pick your TOP 3 Categories
          </h1>
        </div>
        <div className="flex justify-center">
          <Card />
        </div>
        
        <div
          className={
            count.user !== 3 ? "hidden" : "absolute inset-x-0 bottom-5"
          }
        >
          <CategoryButton />
        
        </div>
      </div>
      {/* <button onClick={userStatus}>test</button> */}
    </div>
  );
};

export default OnBoard;
