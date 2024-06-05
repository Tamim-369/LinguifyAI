import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { TbLogout } from "react-icons/tb"; // Assuming you have this icon installed
import { UserContext } from "../context/UserContextProvider";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { isUserLoggedIn, handleLogout, setIsUserLoggedIn } =
    useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, []);
  return (
    <>
      <nav className="bg-white fixed  left-0 top-0 right-0 w-full z-40 border-b">
        <div className="mx-auto max-w-full px-3">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-shrink-0 items-center">
              <a href="/" className="text-xl sm:flex hidden font-semibold mx-3">
                LinguifyAI
              </a>
            </div>
            <div className="inset-y-0 flex items-center sm:hidden">
              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setShowMenu(!showMenu)}
                className={`relative inline-flex items-center justify-center rounded-md p-1 hover:bg-gray-900 hover:text-white focus:outline-none ${
                  showMenu ? "bg-gray-900 text-white" : ""
                }`}
                aria-controls="mobile-menu"
                aria-expanded={showMenu}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${showMenu ? "hidden" : "block"} h-7 w-7`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className={`${showMenu ? "block" : "hidden"} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link
                    to="/"
                    className="text-gray-900 hover:text-gray-950 font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className="text-gray-900 hover:text-gray-950 font-medium"
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    className="text-gray-900 hover:text-gray-950 font-medium"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <div
                className={`${isUserLoggedIn ? "flex" : "hidden"} fle gap-2`}
              >
                <Link
                  to="/profile"
                  className="bg-gray-900 flex justify-center items-center text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="sm:bg-gray-900 flex justify-center items-center gap-2 text-black sm:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  <TbLogout className="sm:text-xl text-2xl" />
                  <span className="sm:flex hidden">Logout</span>
                </button>
              </div>
              <Link
                to="/signup"
                className={`${
                  isUserLoggedIn ? "hidden" : ""
                } bg-gray-900 text-white rounded-md px-3 py-2 text-base font-medium`}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        {showMenu && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link
                to="/"
                className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/team"
                className="text-gray-700 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
              >
                Team
              </Link>
              <Link
                to="/projects"
                className="text-gray-700 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
              >
                Projects
              </Link>
              <Link
                to="/calendar"
                className="text-gray-700 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
              >
                Calendar
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
