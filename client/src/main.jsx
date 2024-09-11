import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import ChatContextProvider from "./context/ChatContextProvider.jsx";
import UserContextProvider from "./context/UserContextProvider.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserContextProvider>
      <ChatContextProvider>
        <App />
        <Toaster position="top-center" reverseOrder={false} />
      </ChatContextProvider>
    </UserContextProvider>
  </BrowserRouter>
);
