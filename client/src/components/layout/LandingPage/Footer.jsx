import React from "react";
import { FaCode } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full bg-amber-100">
      <div className="sm:w-[80%] sm:max-w-[1920px] w-[90%] mx-auto grid lg:grid-cols-4 grid-cols-2 py-10 gap-y-10 gap-x-10">
        <Link to={"/"} className="sm:col-span-1 col-span-full">
          <h1 className="flex items-center font-bold gap-x-3 text-3xl text-blue-600 cursor-pointer">
            <FaCode />
            <span className="">Connect</span>
          </h1>
        </Link>
        <div>
          <b className="text-xl">General</b>
          <ul className="md:pt-5 pt-3">
            <li>
              <Link
                to="/register"
                className="transition-all duration-200 hover:underline cursor-pointer hover:underline-offset-1"
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                to="/help"
                className="transition-all duration-200 hover:underline cursor-pointer hover:underline-offset-1"
              >
                Help Center
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="transition-all duration-200 hover:underline cursor-pointer hover:underline-offset-1"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="transition-all duration-200 hover:underline cursor-pointer hover:underline-offset-1"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/developers"
                className="transition-all duration-200 hover:underline cursor-pointer hover:underline-offset-1"
              >
                Developers
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <b className="text-xl">Directories</b>
          <ul className="md:pt-5 pt-3">
            <li>
              <Link
                to="/members"
                className="transition-all duration-200 hover:underline cursor-pointer hover:underline-offset-1"
              >
                Members
              </Link>
            </li>
            <li>
              <Link
                to="/featured"
                className="transition-all duration-200 hover:underline cursor-pointer hover:underline-offset-1"
              >
                Featured
              </Link>
            </li>
            <li>
              <Link
                to="/articles"
                className="transition-all duration-200 hover:underline cursor-pointer hover:underline-offset-1"
              >
                Article
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="transition-all duration-200 hover:underline cursor-pointer hover:underline-offset-1"
              >
                Services
              </Link>
            </li>
          </ul>
        </div>

        <div className="sm:block hidden">
          <b className="text-xl">Business</b>
          <ul className="md:pt-5 pt-3">
            <li>
              <Link
                to="/sales"
                className="transition-all duration-200 hover:underline cursor-pointer hover:underline-offset-1"
              >
                Sales
              </Link>
            </li>
            <li>
              <Link
                to="/marketing"
                className="transition-all duration-200 hover:underline cursor-pointer hover:underline-offset-1"
              >
                Marketing
              </Link>
            </li>
            <li>
              <Link
                to="/solutions"
                className="transition-all duration-200 hover:underline cursor-pointer hover:underline-offset-1"
              >
                Solutions
              </Link>
            </li>
            <li>
              <Link
                to="/learning"
                className="transition-all duration-200 hover:underline cursor-pointer hover:underline-offset-1"
              >
                Learning
              </Link>
            </li>
            <li>
              <Link
                to="/advice"
                className="transition-all duration-200 hover:underline cursor-pointer hover:underline-offset-1"
              >
                Advice
              </Link>
            </li>
            <li>
              <Link
                to="/companies"
                className="transition-all duration-200 hover:underline cursor-pointer hover:underline-offset-1"
              >
                Companies
              </Link>
            </li>
            <li>
              <Link
                to="/careers"
                className="transition-all duration-200 hover:underline cursor-pointer hover:underline-offset-1"
              >
                Careers
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <hr className="opacity-20" />
      <p className="text-base text-gray-700 text-center py-4">
        Copyright &copy; {new Date().getFullYear()} - Connect - Developed by
        Sourav
      </p>
    </footer>
  );
}

export default Footer;
