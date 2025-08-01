import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAccount, getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../layout/LandingPage/Footer";
import DashboardAction from "./DashboardAction";
import Experience from "./Experience";
import Education from "./Education";
import Navbar from "../layout/Navbar";
import DashboardNavbar from "./DashboardNavbar";

function Dashboard({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAccount,
}) {
  const navigate = useNavigate();
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile == null ? (
    <Spinner />
  ) : (
    <>
      <div className="sm:w-[80%] sm:max-w-[1920px] w-[90%] mx-auto pt-25 ">
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome {user && user.name}
        </p>
        {profile !== null ? (
          <>
            <DashboardAction />
            {profile.experience && (
              <Experience experience={profile.experience} />
            )}
            {profile.education && <Education education={profile.education} />}
            <div className="my-2">
              <button
                className="btn btn-danger"
                onClick={() => deleteAccount(navigate)}
              >
                <i className="fas fa-user-minus"></i> Delete My Account
              </button>
            </div>
          </>
        ) : (
          <>
            <p>
              You have not yet set up your profile, please add some info to
              increase your visibility{" "}
            </p>{" "}
            <Link to="/create-profile" className="my-1 btn btn-primary">
              Create Profile
            </Link>
          </>
        )}
      </div>
    </>
  );
}

Dashboard.PropTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
