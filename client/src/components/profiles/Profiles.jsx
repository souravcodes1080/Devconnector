import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getAllProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem";
function Profiles({ getAllProfiles, profile: { profiles, loading } }) {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);
  const [search, setSearch] = useState("");
  const [filteredSearch, setFilteredSearch] = useState([]);
  const searchUser = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredSearch(profiles);
      const filteredProfiles = profiles.filter((profile) =>
        profile.user.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredSearch(filteredProfiles);
    }, 800);

    return () => clearTimeout(timer);
  }, [search, profiles]);
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
          <div className="form-group">
            <input
              type="text"
              placeholder="Search user profiles"
              name="search"
              value={search}
              onChange={(e) => searchUser(e)}
              className="my-1 p-1"
              style={{ width: "100%", fontSize: "16px" }}
            />
          </div>
          <div className="profiles">
            {profiles.length > 0 ? (
              filteredSearch.length > 0 ? (
                filteredSearch
                  .reverse()
                  .map((profile) => (
                    <ProfileItem key={profile._id} profile={profile} />
                  ))
              ) : (
                <h4>User Not Found.</h4>
              )
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
