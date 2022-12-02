import React from "react";
import Bee from "../../assets/bee.png";
import CatCard from "../Cards/CatCard";
import video from "../../assets/connect2.mp4";
import { motion } from "framer-motion";

const FirstLogin = () => {
  const bounceTransition = {
    y: {
      duration: 1,
      yoyo: Infinity,
      ease: "easeOut",
    },
  };
  return (
    <div className="w-full h-full relative">
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
          <CatCard />
        </div>
      </div>
    </div>
  );
};

export default FirstLogin;
