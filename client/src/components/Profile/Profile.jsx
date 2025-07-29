import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById, getUserById } from "../../actions/profile";
import { Link, useParams } from "react-router-dom";
import ProfileTop from "./ProfileTop";

function Profile({
  getProfileById,
  match,
  profile: { profile, loading, user },
  auth,
  getUserById,
}) {
  const { id } = useParams();
  useEffect(() => {
    getProfileById(id);
    getUserById(id);
  }, [getProfileById, getUserById, id]);
  return (
    <div>
      {profile === null ? (
        <div className="container">
          <Link to="/profiles" className="btn btn-light">
            <i className="fas fa-arrow-left"></i> Back to Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}

          <div className="profile-top bg-primary p-2 my-1">
            <img
              className="round-img my-1"
              src={user?.avatar}
              alt=""
              style={{ backgroundColor: "white" }}
            />
            <h1 className="large">{user?.name}</h1>
          </div>
           <h4>No profile records.</h4>
        </div>
      ) : loading ? (
        <Spinner />
      ) : (
        <div className="container">
          <Link to="/profiles" className="btn btn-light">
            <i className="fas fa-arrow-left"></i> Back to Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
          </div>
        </div>
      )}
    </div>
  );
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getUserById: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById, getUserById })(
  Profile
);
