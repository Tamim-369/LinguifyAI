import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContextProvider";
import Hero from "../components/Hero";
import Demo from "../components/Demo";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/chat");
  }, []);
  return (
    <div className="box-border bg-white min-[480px]:min-h-screen">
      <Hero />
      <Demo />

      <Footer />
    </div>
  );
};

export default Home;
