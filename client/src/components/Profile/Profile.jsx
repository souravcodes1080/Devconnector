import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import { Link, useParams } from "react-router-dom";
import ProfileTop from "./ProfileTop";

function Profile({
  getProfileById,
  match,
  profile: { profile, loading },
  auth,
}) {
  const { id } = useParams();
  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);
  return (
    <div>
      {profile === null || loading ? (
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
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
