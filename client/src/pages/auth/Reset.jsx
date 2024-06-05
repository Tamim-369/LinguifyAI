import axios from "axios";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Reset = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const onReset = async (e) => {
    e.preventDefault();
    if (password.length > 0 && token.length > 0) {
      setLoading(true);
      const res = await axios.put("/api/users/reset", { token, password });
      toast(res.data.message, {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#14191d",
          color: "#fff",
        },
      });
      setLoading(false);

      navigate("/login");
    } else {
      setLoading(false);

      toast("Something went wrong", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#14191d",
          color: "#fff",
        },
      });
    }
  };
  useEffect(() => {
    if (password.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password]);
  useEffect(() => {
    const foundToken = window.location.search.split("=")[1];
    setToken(foundToken);
  }, []);
  return (
    <>
      <div className="font-sans bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <form className="bg-white  px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-2xl text-center font-bold">
              Enter your new password
            </h1>

            <input
              type="password"
              className="block bg-background border-black border-2 focus:outline-none  w-full p-2 text-[1rem] rounded-lg mb-4"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Your Password"
            />

            <button
              type="submit"
              onClick={onReset}
              className="w-full text-center py-2.5 rounded-lg bg-black text-white hover:bg-green-dark focus:outline-none my-1 disabled:bg-gray-900 disabled:cursor-not-allowed"
              disabled={disabled || loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Reset;
