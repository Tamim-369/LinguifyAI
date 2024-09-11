import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import DataInput from "./pages/DataInput";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Verify from "./pages/auth/Verify";
import Reset from "./pages/auth/Reset";
import { useEffect, useState } from "react";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import UserContextProvider from "./context/UserContextProvider";
import Payment from "./pages/plan/Subscribe";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/subscribe" element={<Payment />} />
        <Route path="/verifyemail" element={<Verify />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </>
  );
};

export default App;
