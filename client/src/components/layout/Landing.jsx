import React from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LandingPageNavbar from "./LandingPage/LandingPageNavbar";
import { MdPeopleAlt } from "react-icons/md";
import LandingPage from "./LandingPage/LandingPage";
function Landing({ isAuthenticated }) {
  // if (isAuthenticated) {
  //   return <Navigate to="/dashboard" />;
  // }
  return (
    <>
      <LandingPage />
    </>
  );
}

Landing.PropTypes = {
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
