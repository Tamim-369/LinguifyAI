import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { TbLoader2 } from "react-icons/tb";
const SignUpPage = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      if (response.data.error) {
        toast(response.error, {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#14191d",
            color: "#fff",
          },
        });
      } else {
        toast(
          "We have send a verification link in your email address Please click and verify",
          {
            icon: "👏",
            style: {
              borderRadius: "10px",
              background: "#14191d",
              color: "#fff",
            },
          }
        );
        console.log(response.data);

        navigate("/login");
      }
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
    if (localStorage.getItem("token")) navigate("/profile");
  }, []);
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <div className="flex flex-col min-h-screen w-full justify-center items-center">
          <TbLoader2 className="animate-spin text-3xl" />
        </div>
      ) : (
        <div className="font-sans bg-grey-lighter min-h-screen flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <form
              onSubmit={onSignUp}
              className="bg-white px-6 py-8 rounded-lg shadow-md text-black w-full"
            >
              <h1 className="mb-8 text-2xl text-center font-bold">
                {loading ? "signing up..." : "Sign up"}
              </h1>
              <input
                type="text"
                className="block bg-background border-black border-2 focus:outline-none  w-full p-3 text-[1rem] rounded-lg mb-4"
                name="username"
                value={user.username}
                onChange={(e) => {
                  setUser({ ...user, username: e.target.value });
                }}
                placeholder="Your Name"
              />
              <input
                type="email"
                className="block bg-background border-black border-2 focus:outline-none  w-full p-3 text-[1rem] rounded-lg mb-4"
                name="email"
                value={user.email}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
                placeholder="Your Email"
              />
              <input
                type="password"
                className="block bg-background border-black border-2 focus:outline-none  w-full p-3 text-[1rem] rounded-lg mb-4"
                name="password"
                value={user.password}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
                placeholder="Your New Password"
              />
              <button
                type="submit"
                className={
                  "w-full text-center py-3 rounded-lg bg-black text-white hover:bg-green-dark focus:outline-none my-1 disabled:bg-gray-900 disabled:cursor-not-allowed"
                }
                disabled={disabled || loading}
              >
                Sign Up
              </button>
            </form>
            <div className="text-grey-dark mt-6">
              Already have an account?
              <Link
                className="no-underline border-b-2 border-black text-blue"
                to="/login"
              >
                Log in
              </Link>
              .
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpPage;
