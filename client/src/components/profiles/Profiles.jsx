import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getAllProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem";
function Profiles({ getAllProfiles, profile: { profiles, loading } }) {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);
  return (
    <div className="container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              [...profiles]
                .reverse()
                .map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
            ) : (
              <Spinner />
            )}
          </div>
        </>
      )}
    </div>
  );
}

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getAllProfiles })(Profiles);
