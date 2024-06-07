import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import ChatContextProvider from "./context/ChatContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChatContextProvider>
    <App />
    <Toaster position="top-center" reverseOrder={false} />
  </ChatContextProvider>
);
