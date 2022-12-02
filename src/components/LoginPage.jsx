import React from "react";
import video from "../assets/connect2.mp4";
import Typed from "react-typed";
import Bee from "../assets/bee.png";
// import { motion } from "framer-motion";
const LoginPage = () => {
  // const bounceTransition = {
  //   y: {
  //     duration: 1,
  //     yoyo: Infinity,
  //     ease: "easeOut",
  //   },
  // };

  return (
    <div className="w-full h-screen relative">
      <video
        className="w-full h-full object-cover"
        src={video}
        autoPlay
        loop
        muted
      />

      <div className="absolute w-full h-full top-0 left-0"></div>
      <div className="absolute top-0 w-full h-full flex flex-col justify-center text-center text-white p-4 bg-gray-900/50">
        {/* <motion.span
          transition={bounceTransition}
          animate={{ y: ["5%", "-5%"] }}
        className="flex justify-center item-center">
          <img src={Bee} className="object-contain h-50 w-96 " alt="logo" />
        </motion.span> */}
        <div className="flex justify-center item-center">
          <img src={Bee} className="object-contain h-50 w-96 " alt="logo" />
        </div>
        <h1 className="text-8xl">V I B E</h1>
        <Typed
          className="text-4xl md:text-4xl font-bold"
          strings={["Discover.", "Listen.", "Connect."]}
          typeSpeed={80}
          backSpeed={80}
          loop
        />
        <div className="p-7">
          <button class="m-2 h-12 px-5 text-lg border-hidden  text-white rounded-xl transition-all duration-500 bg-gradient-to-tl from-blue-500 via-sky-300 to-blue-500 bg-size-200 bg-pos-0 hover:bg-pos-100">
            Login with Spotify
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
