import React from "react";
import { FaCode } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import { Link } from "react-router-dom";

function LandingPageNavbar() {
  return (
    <header className="w-[100%] mx-auto fixed z-10 bg-white/25 backdrop-blur-sm">
      <div className="sm:w-[80%] sm:max-w-[1920px] w-[95%] py-6  mx-auto flex items-center justify-between ">
        <Link to={"/"}>
        <h1 className="flex items-center font-bold gap-x-3 text-3xl text-blue-600 cursor-pointer">
          <FaCode />
          <span className="hidden sm:block">Connect</span>
        </h1>
        </Link>
        <div className="flex items-center">

          <Link to={'/profiles'} className="mr-7 text-base flex items-center gap-x-2 transition-all duration-300 hover:text-blue-700 cursor-pointer">
            <MdPeopleAlt /> People
          </Link>
          <Link to="/login" className="mr-7 text-base transition-all duration-300 hover:text-blue-700 cursor-pointer">Login</Link>
          <Link to={'/register'} className="bg-blue-600 text-white text-base font-semibold sm:px-5 px-4 py-2 rounded-full cursor-pointer transition-all duration-300 hover:bg-blue-700">
            Join now
          </Link>
        </div>
      </div>
    </header>
  );
}

export default LandingPageNavbar;
