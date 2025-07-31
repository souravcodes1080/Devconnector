import React, { Fragment, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import LandingPageNavbar from "../layout/LandingPage/LandingPageNavbar";
import Footer from "../layout/LandingPage/Footer";
import { FaRegEye, FaRegEyeSlash, FaSpinner, FaUser } from "react-icons/fa";

function Login({ login, isAuthenticated }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const [toggleHide, setToggleHide] = useState(true);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {

    e.preventDefault();
     let tempErrors = {};

  if (!email.trim()) tempErrors.email = "Email is required";
  if (!password.trim()) tempErrors.password = "Password is required";

  if (Object.keys(tempErrors).length > 0) {
    setErrors(tempErrors);
    return; 
  }

  setErrors({}); 
    try {
      setLoading(true);
      await login(email, password);
    } finally {
      setLoading(false);
    }
    
  };

  //redirect if logged in

  if (isAuthenticated) {
    return <Navigate to="/posts" />;
  }

  return (
    <div className="bg-gray-50">
      <LandingPageNavbar />
      <section className="flex justify-center items-center min-h-[80vh]">
        <div className="md:max-w-100 w-100 py-30 sm:px-0 px-4">
          <h2 className="md:text-4xl text-xl font-semibold text-blue-600">
            Login
          </h2>
          <p className="flex items-center md:gap-x-3 gap-x-1 pt-2 pb-5 md:text-lg text-base">
            <FaUser /> Welcome back!
          </p>
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              className="bg-white border border-black/20 w-full rounded-xl py-3 px-7 outline-none text-base my-2"
            />
            {errors.email && (
              <small className="text-red-600 text-sm">{errors.email}</small>
            )}
            <div className="relative">
              <input
                type={toggleHide ? "password" : "text"}
                placeholder="Password"
                name="password"
                minLength="6"
                value={password}
                onChange={(e) => onChange(e)}
                className="bg-white border border-black/20 w-full rounded-xl py-3 px-7 outline-none text-base my-2"
              />
              <p
                className="absolute top-1/2 right-7 transform translate-y-[-50%] cursor-pointer text-blue-600"
                onClick={() => setToggleHide(!toggleHide)}
              >
                {toggleHide ? <FaRegEye /> : <FaRegEyeSlash />}
              </p>
            </div>
              {errors.password && (
              <small className="text-red-600 text-sm">{errors.password}</small>
            )}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-7 rounded-xl text-base cursor-pointer text-white transition-all duration-300 my-2 ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <FaSpinner className="animate-spin text-xl  mx-auto" />
              ) : (
                "Login"
              )}
            </button>
            <p className="text-center">
              Do not have any account?{" "}
              <Link to="/register" className="text-blue-600 cursor-pointer">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}

Login.PropTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);

