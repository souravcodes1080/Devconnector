import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import {
  clearProfilePosts,
  getPostsById,
  getProfileById,
  getUserById,
} from "../../actions/profile";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import PostItem from "../post/PostItem";
import FollowersItem from "./FollowersItem";
import { GoChevronLeft } from "react-icons/go";
import Github from "./Github";

function Profile({
  getProfileById,
  match,
  profile: { profile, loading, user },
  auth,
  getUserById,
  getPostsById,
  posts,
  followers,
  clearProfilePosts,
}) {
  const { id } = useParams();
  useEffect(() => {
    clearProfilePosts();
    getPostsById(id);
    getProfileById(id);
    getUserById(id);
  }, [clearProfilePosts, getProfileById, getUserById, getPostsById, id]);
  const navigate = useNavigate();
  return (
    <div>
      {profile === null ? (
        <div className="min-h-[80vh]">
          <section className="pb-10 bg-gray-50">
            <div className="sm:w-[80%] relative sm:max-w-[1920px] w-[90%] mx-auto pt-25 ">
              <div className="lg:block hidden border border-gray-300/50 bg-white shadow-sm rounded-xl pt-8  lg:w-[37%] md:w-[80%] lg:absolute right-0 lg:ml-auto ml-auto lg:mb-0 mb-6 px-10 py-10">
                <h4 className="text-2xl ">
                  Following (
                  {followers?.length ? profile?.followers?.length : 0})
                </h4>
                {followers?.length > 0 ? (
                  <>
                    <div>
                      <div className="">
                        {profile?.followers?.map((follower, i) => (
                          <div key={follower._id}>
                            <FollowersItem follower={follower} />
                            {i !== profile?.followers?.length - 1 && (
                              <hr className="mt-2 mb-0 opacity-25" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="posts relative lg:w-[60%] md:w-[100%] w-[100%] lg:mr-auto mr-auto">
                <button
                  onClick={() => navigate(-1)}
                  className="absolute top-0 hidden px-4 py-2.5 transition-all duration-300 bg-white border rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 border-gray-300/10 -left-17 md:block"
                >
                  <GoChevronLeft className="text-2xl " />
                </button>
                <ProfileTop profile={profile} user={user} id={id} />
                {loading ? (
                  <Spinner />
                ) : posts.length === 0 ? (
                  <h4>No posts available.</h4>
                ) : (
                  posts.map((post) => <PostItem post={post} key={post._id} />)
                )}
              </div>
            </div>
          </section>
        </div>
      ) : // <div className="container">
      //   <Link to="/profiles" className="btn btn-light">
      //     <i className="fas fa-arrow-left"></i> Back to Profiles
      //   </Link>

      //   <div className="p-2 my-1 profile-top bg-primary">
      //     <img
      //       className="my-1 rounded-full"
      //       src={user?.avatar}
      //       alt=""
      //       style={{ backgroundColor: "white" }}
      //     />
      //     <h1 className="large">{user?.name}</h1>
      //   </div>
      //   <h4>No profile records.</h4>
      // </div>
      loading ? (
        <div className="h-[80vh]">
          <Spinner />
        </div>
      ) : (
        <section className="pb-10 bg-gray-50">
          <div className="sm:w-[80%] relative sm:max-w-[1920px] w-[90%] mx-auto pt-25 ">
            <div className="right-0 hidden lg:w-[37%] md:w-[80%] lg:block lg:absolute">
              {profile.githubUsername && (
                <div className="hidden px-10 py-8 mb-4 bg-white border shadow-sm lg:block border-gray-300/50 rounded-xl">
                  <h4 className="text-2xl">
                    Github
                    <Github githubUsername={profile.githubUsername} />
                  </h4>
                </div>
              )}{" "}
              <div className="hidden px-10 py-8 mb-4 bg-white border shadow-sm lg:block border-gray-300/50 rounded-xl">
                <h4 className="text-2xl ">
                  Following ({profile?.followers?.length})
                </h4>
                {profile.followers.length > 0 ? (
                  <>
                    <div>
                      <div className="">
                        {profile.followers?.map((follower, i) => (
                          <div key={follower._id}>
                            <FollowersItem follower={follower} />
                            {i !== profile.followers.length - 1 && (
                              <hr className="mt-2 mb-0 opacity-25" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="posts relative lg:w-[60%] md:w-[100%] w-[100%] lg:mr-auto mr-auto">
              <button
                onClick={() => navigate(-1)}
                className="absolute top-0 hidden px-4 py-2.5 transition-all duration-300 bg-white border rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 border-gray-300/10 -left-17 md:block"
              >
                <GoChevronLeft className="text-2xl " />
              </button>
              <ProfileTop profile={profile} id={id} />
              <div>
                <h2 className="py-3 text-xl font-semibold">
                  Posts ({posts.length})
                </h2>

                {posts.length === 0 ? (
                  <h4>No posts available.</h4>
                ) : (
                  posts.map((post) => <PostItem post={post} key={post._id} />)
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getUserById: PropTypes.func.isRequired,
  getPostsById: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  posts: state.profile.posts,
  followers: state.profile.followers,
});

export default connect(mapStateToProps, {
  getProfileById,
  getUserById,
  getPostsById,
  clearProfilePosts,
})(Profile);
