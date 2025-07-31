import React, { useState, useRef, useEffect } from "react";
import { FaCode } from "react-icons/fa";
import { MdOutlineDashboardCustomize, MdPeopleAlt } from "react-icons/md";
import { Link, Links, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

function DashboardNavbar({ auth: { user, isAuthenticated }, logout }) {
    const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full mx-auto fixed z-10 bg-white/25 backdrop-blur-sm">
      <div className="sm:w-[80%] sm:max-w-[1920px] w-[95%] sm:py-4 py-5 mx-auto flex items-center justify-between">
        <Link to={"/"}>
          <h1 className="flex items-center font-bold gap-x-3 text-3xl text-blue-600 cursor-pointer">
            <FaCode />
            <span className="hidden sm:block">Connect</span>
          </h1>
        </Link>
        <div className="flex items-center relative" ref={dropdownRef}>
          <Link
            to={"/profiles"}
            className="mr-7 text-base flex items-center gap-x-2 transition-all duration-300 hover:text-blue-700 cursor-pointer"
          >
            <MdPeopleAlt /> People
          </Link>
          <Link
            to="/posts"
            className="mr-7 text-base transition-all flex items-center gap-x-2 duration-300 hover:text-blue-700 cursor-pointer"
          >
            <MdOutlineDashboardCustomize /> Posts
          </Link>

          {user && (
            <div className="relative">
              <img
                onClick={() => setShowDropdown((prev) => !prev)}
                src={user.avatar}
                className="sm:w-15 w-12 rounded-full bg-white cursor-pointer transition-transform duration-100 hover:scale-105 active:scale-95"
                alt="avatar"
              />
              <div
                className={`absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 ease-in-out transform origin-top ${
                  showDropdown
                    ? "opacity-100 scale-100 visible"
                    : "opacity-0 scale-95 invisible"
                }`}
              >
                <div className="p-4 border-b border-gray-200">
                  <p className="text-sm text-gray-700 font-medium">
                    Hello, {user.name.split(" ")[0]}!
                  </p>
                </div>
                <button
                  onClick={()=>navigate("/dashboard")}
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-all"
                >
                  Your Profile
                </button>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 text-red-600 transition-all"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

DashboardNavbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(DashboardNavbar);
