import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { TbLoader2, TbLoader3 } from "react-icons/tb";

const LogInPage = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onResetStart = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (user.email.length > 0) {
      const res = await axios.post("/api/users/forget", { email: user.email });
      toast(res.data.message, {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#14191d",
          color: "#fff",
        },
      });
      setLoading(false);
      setUser({ email: "", password: "" });
    } else {
      toast("Please enter your email", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#14191d",
          color: "#fff",
        },
      });
      setLoading(false);
    }
  };
  const onLogIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);

      if (response.data.error) {
        toast(response.data.error, {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#14191d",
            color: "#fff",
          },
        });
        return;
      }
      localStorage.setItem("token", response.data.token);
      window.location.replace("/chat");
    } catch (error) {
      console.log(error.response.data.error);
      toast(error.response.data.error, {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#14191d",
          color: "#fff",
        },
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);
  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/chat");
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex flex-col min-h-screen w-full justify-center items-center">
          <TbLoader2 className="animate-spin text-3xl" />
        </div>
      ) : (
        <div className="font-sans bg-grey-lighter mt-28 flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <form className="bg-backgroundUpper px-6 pb-8 pt-6 rounded-lg shadow-md  bg-white text-black w-full">
              <h1 className="mb-4 text-2xl flex justify-center items-center text-center font-bold">
                Log In
              </h1>

              <input
                type="email"
                className="block bg-background border-black border-2 focus:outline-none  w-full p-2 text-[1rem] rounded-lg mb-4"
                name="email"
                value={user.email}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
                placeholder="Your email"
              />
              <input
                type="password"
                className="block bg-background border-black border-2 focus:outline-none  w-full p-2 text-[1rem] rounded-lg mb-4"
                name="password"
                value={user.password}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
                placeholder="Your Password"
              />

              <button
                type="submit"
                onClick={onLogIn}
                className="w-full text-center py-2.5 rounded-lg bg-black text-white hover:bg-green-dark focus:outline-none my-1 disabled:bg-gray-900 disabled:cursor-not-allowed"
                disabled={disabled || loading}
              >
                Log In
              </button>
            </form>
            <div className="text-grey-dark text-sm mt-6 flex flex-wrap gap-1">
              <span>Already have an account? </span>
              <Link
                className="no-underline border-b-2 border-black text-blue"
                to="/signup"
              >
                Sign Up
              </Link>
              <div className="text-grey-dark  ">
                <span> or </span>
                <button
                  className="no-underline border-b-2 border-black text-blue"
                  onClick={onResetStart}
                >
                  {" "}
                  Forgot password
                </button>
                .
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogInPage;
