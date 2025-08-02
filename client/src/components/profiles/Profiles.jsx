import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getAllProfiles } from "../../actions/profile";
import PostForm from "../post/PostForm";
import ProfileItem from "./ProfileItem";
import DashboardNavbar from "../dashboard/DashboardNavbar";
import { FaUser } from "react-icons/fa";
import ProfileItemSkeleton from "./ProfileItemSkeleton";
function Profiles({ getAllProfiles, profile: { profiles, loading }, auth }) {
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
    <div className="bg-gray-50 min-h-[80vh]">
      {loading ? (
        <div className="h-[80vh]">
          <Spinner />
        </div>
      ) : (
        <>
          <section className="sm:w-[80%] sm:max-w-[1920px]  w-[90%] mx-auto pt-25  ">
            {/* <div className="hidden md:block">
              <PostForm />
            </div> */}
            <div className="">
              <h1 className="text-2xl font-semibold md:text-3xl">Developers</h1>
              <p className="flex items-center mt-2 mb-5 text-lg md:text-xl gap-x-3">
                <FaUser /> Browse and connect with developers
              </p>

              <div>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-3 md:gap-5 md:gap-y-1 gap-y-0">
                  {profiles.length > 0 ? (
                    (() => {
                      const isLoggedIn = auth?.user?._id;
                      const filtered = isLoggedIn
                        ? filteredSearch.filter(
                            (profile) => profile.user._id !== auth.user._id
                          )
                        : filteredSearch;

                      return filtered.length > 0 ? (
                        filtered
                          .reverse()
                          .map((profile) => (
                           
                            
                            <ProfileItem key={profile._id} profile={profile} />
                         
                          ))
                      ) : (
                        <>
                          <ProfileItemSkeleton />
                          <ProfileItemSkeleton />
                          <ProfileItemSkeleton />
                          <ProfileItemSkeleton />
                          <ProfileItemSkeleton />
                        </>
                      );
                    })()
                  ) : (
                    <Spinner />
                  )}
                </div>
              </div>
            </div>
          </section>
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
  auth: state.auth,
});
export default connect(mapStateToProps, { getAllProfiles })(Profiles);

{
  /* <h1 className="large text-primary">Developers</h1>
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
    className="p-1 my-1"
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
</div> */
}
