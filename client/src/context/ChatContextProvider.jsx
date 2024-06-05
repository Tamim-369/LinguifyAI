import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ChatContext = createContext(null);
const ChatContextProvider = ({ children }) => {
  const [chatText, setChatText] = useState("");
  const value = {
    chatText,
    setChatText,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContextProvider;
