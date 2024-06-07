import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className=" mt-8 min-h-[60dvh] w-11/12 sm:w-9/12 md:w-7/12 lg:w-[40%] text-center flex flex-col justify-center gap-2 items-center mx-auto">
      <h1 className="text-[1.3rem] sm:text-2xl font-semibold">
        Welcome to <b>LinguifyAi</b>
      </h1>
      <p className="text-[1.1rem] sm:text-xl font-medium">
        Linguify is an AI-powered tool that allows users to chat with thier pdf
        files. You can chat with any pdf file no matter how big it is.
      </p>
      <div className="mt-2">
        <Link
          to="/login"
          className="text-white   bg-black  hover:text-white block rounded-lg px-4 py-2 text-base sm:text-lg font-medium"
        >
          Get started
        </Link>
      </div>
    </div>
  );
};

export default Hero;
