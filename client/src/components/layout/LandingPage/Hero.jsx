import React from "react";
import { MdPeopleAlt } from "react-icons/md";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <>
      <main className="sm:w-[80%] sm:max-w-[1920px] w-[90%] mx-auto h-[100vh] flex items-center justify-between">
        <div className="flex-1">
          <h1 className="sm:text-7xl text-5xl font-bold text-blue-600 sm:leading-20 leading-15 tracking-tighter sm:text-left text-center">
            Meet, Build & Grow <br /> on Connect
          </h1>
          <p className="text-xl font-light sm:w-[75%] w-full my-5 sm:text-left text-center">
            Create a developer profile/portfolio, share posts and get help from
            other developers.
          </p>
          <div className="flex items-center  mt-10  sm:justify-start justify-center">
            <Link
              to={"/profiles"}
              className="mr-5 text-base  items-center gap-x-2 transition-all duration-300 hover:bg-blue-600 hover:text-white  cursor-pointer border border-blue-600 sm:px-7 px-4 py-3 rounded-full hidden sm:flex"
            >
              <MdPeopleAlt /> People
            </Link>
            <Link
              to={"/register"}
              className="bg-blue-500 text-white text-lg font-semibold sm:px-7 px-4 py-3 rounded-full cursor-pointer transition-all duration-300 hover:bg-blue-700"
            >
              Join now
            </Link>
          </div>
        </div>
        <div className="flex-1  md:flex justify-end  hidden">
          <img
            src="/images/figure2.svg"
            alt="hero-image"
            className="w-[80%] "
          />
        </div>
      </main>
    </>
  );
}

export default Hero;
