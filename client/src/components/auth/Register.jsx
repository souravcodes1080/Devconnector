import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

import LandingPageNavbar from "../layout/LandingPage/LandingPageNavbar";
import Footer from "../layout/LandingPage/Footer";
import { FaUser } from "react-icons/fa6";
import { FaRegEye, FaRegEyeSlash, FaSpinner } from "react-icons/fa";

function Register({ setAlert, register, isAuthenticated }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [toggleHide, setToggleHide] = useState(true);
  const [toggleHide2, setToggleHide2] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    let tempErrors = {};

    if (!name.trim()) tempErrors.name = "Name is required";
    if (!email.trim()) tempErrors.email = "Email is required";
    if (password !== password2) tempErrors.password2 = "Passwords do not match";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setErrors({});
    try {
      setLoading(true);
      await register({ name, email, password });
    } finally {
      setLoading(false);
    }
  };

  //redirect if registered in
  if (isAuthenticated) {
    return <Navigate to="/posts" />;
  }
  return (
    <div className="bg-gray-50">
      
      <section className="flex justify-center items-center min-h-[80vh]">
        <div className="px-4 md:max-w-100 min-w-70 py-30 sm:px-0">
          <h2 className="text-xl font-semibold text-blue-600 md:text-4xl">
            Register
          </h2>
          <p className="flex items-center pt-2 pb-5 text-base md:gap-x-3 gap-x-1 md:text-lg">
            <FaUser /> Create Your Account
          </p>
          <form onSubmit={(e) => onSubmit(e)}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
              className="w-full py-3 my-2 text-base bg-white border outline-none border-black/20 rounded-xl px-7"
            />
            {errors.name && (
              <small className="text-sm text-red-600">{errors.name}</small>
            )}

            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              className="w-full py-3 my-2 text-base bg-white border outline-none border-black/20 rounded-xl px-7"
            />
            {errors.email && (
              <small className="text-sm text-red-600">{errors.email}</small>
            )}

            <div className="relative">
              <input
                type={toggleHide ? "password" : "text"}
                placeholder="Password"
                name="password"
                minLength={6}
                value={password}
                onChange={(e) => onChange(e)}
                className="w-full py-3 my-2 text-base bg-white border outline-none border-black/20 rounded-xl px-7"
              />
              <p
                className="absolute top-1/2 right-7 transform translate-y-[-50%] cursor-pointer text-blue-600"
                onClick={() => setToggleHide(!toggleHide)}
              >
                {toggleHide ? <FaRegEye /> : <FaRegEyeSlash />}
              </p>
            </div>

            <div className="relative">
              <input
                type={toggleHide2 ? "password" : "text"}
                placeholder="Confirm Password"
                minLength={6}
                name="password2"
                value={password2}
                onChange={(e) => onChange(e)}
                className="w-full py-3 my-2 text-base bg-white border outline-none border-black/20 rounded-xl px-7"
              />

              <p
                className="absolute top-1/2 right-7 transform translate-y-[-50%] cursor-pointer text-blue-600"
                onClick={() => setToggleHide2(!toggleHide2)}
              >
                {toggleHide2 ? <FaRegEye /> : <FaRegEyeSlash />}
              </p>
            </div>
            {errors.password2 && (
              <small className="text-sm text-red-600 ">
                {errors.password2}
              </small>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-7 rounded-xl cursor-pointer text-base text-white transition-all duration-300 my-2 ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <FaSpinner className="mx-auto text-xl animate-spin" />
              ) : (
                "Register"
              )}
            </button>
            <p className="text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 cursor-pointer">
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
Register.PropTypes = {
  setAlert: PropTypes.func.is,
  register: PropTypes.func.is,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
