import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white shadow-lg border  absolute w-full bottom-0 min-[480px]:relative mt-[20dvh] md:mt-[30dvh] lg:mt-[60dvh] text-black py-4">
      <div className="container mx-auto flex justify-center items-center">
        <p className="text-center">
          &copy; 2024 LinguifyAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
