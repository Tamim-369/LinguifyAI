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
const App = () => {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/dashboard" element={<DataInput />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verifyemail" element={<Verify />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
};

export default App;
