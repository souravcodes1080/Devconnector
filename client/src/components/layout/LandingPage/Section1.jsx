import React from "react";
import { Link } from "react-router-dom";

function Section1() {
  return (
    <section className=" bg-amber-100">
      <div className="sm:w-[80%] sm:max-w-[1920px] w-[90%] mx-auto  flex flex-col items-center justify-center py-20">
        <p className="sm:text-2xl text-xl text-center pb-5 ">
          Showcase your dev journey, post your thoughts, and learn from a global
          developer community.
        </p>
        <Link
          to={"/posts"}
          className=" text-base  items-center transition-all duration-300 hover:bg-blue-600 hover:text-white  cursor-pointer border border-blue-600 sm:px-7 px-4 py-3 rounded-full "
        >
          Post a story
        </Link>
      </div>
    </section>
  );
}

export default Section1;
