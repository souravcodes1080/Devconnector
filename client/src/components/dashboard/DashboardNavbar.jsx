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
    <header className="fixed z-10 w-full mx-auto bg-white/25 backdrop-blur-sm">
      <div className="sm:w-[80%] sm:max-w-[1920px] w-[95%] sm:py-4 py-5 mx-auto flex items-center justify-between">
        <Link to={"/"}>
          <h1 className="flex items-center text-3xl font-bold text-blue-600 cursor-pointer gap-x-3">
            <FaCode />
            <span className="hidden sm:block">Connect</span>
          </h1>
        </Link>
        <div className="relative flex items-center" ref={dropdownRef}>
          <Link
            to={"/profiles"}
            className="flex items-center text-base transition-all duration-300 cursor-pointer mr-7 gap-x-2 hover:text-blue-700"
          >
            <MdPeopleAlt /> People
          </Link>
          <Link
            to="/posts"
            className="flex items-center text-base transition-all duration-300 cursor-pointer mr-7 gap-x-2 hover:text-blue-700"
          >
            <MdOutlineDashboardCustomize /> Posts
          </Link>

          {user && (
            <div className="relative">
              <img
                onClick={() => setShowDropdown((prev) => !prev)}
                src={user.avatar}
                className="w-12 transition-transform duration-100 bg-white rounded-full cursor-pointer sm:w-15 hover:scale-105 active:scale-95"
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
                  <p className="text-sm font-medium text-gray-700">
                    Hello, {user.name.split(" ")[0]}!
                  </p>
                </div>
                <button
                  onClick={()=>navigate(`/profile/${user._id}`)}
                  className="w-full px-4 py-3 text-sm text-left text-gray-700 transition-all cursor-pointer hover:bg-gray-100"
                >
                  Your Profile
                </button>
                <button
                  onClick={logout}
                  className="w-full px-4 py-3 text-sm text-left text-red-600 transition-all cursor-pointer hover:bg-gray-100"
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
