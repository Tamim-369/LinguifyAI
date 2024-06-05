import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext(null);
const UserContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [decodedToken, setDecodedToken] = useState({});
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsUserLoggedIn(false);
    window.location.reload();
  };
  const getUserData = async (id) => {
    const res = await axios.get(`/api/users/getUser/${id}`);
    setUser(res.data.user);
  };
  useEffect(() => {
    (async () => {
      if (localStorage.getItem("token")) {
        setLoading(true);
        const dcodedToken = jwtDecode(localStorage.getItem("token"));
        if (dcodedToken.exp * 1000 < new Date().getTime()) {
          handleLogout();
        }
        await getUserData(dcodedToken.id);
        setDecodedToken(dcodedToken);
        setIsUserLoggedIn(true);
        setLoading(false);
      } else {
        setLoading(false);
        setIsUserLoggedIn(false);
      }
    })();
  }, []);
  const value = {
    user,
    setUser,
    loading,
    handleLogout,
    decodedToken,
    isUserLoggedIn,
    setIsUserLoggedIn,
    getUserData,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
