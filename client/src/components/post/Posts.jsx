import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

import DashboardNavbar from "../dashboard/DashboardNavbar";

import PostItemSkeleton from "./PostItemSkeleton";

function Posts({ getPosts, post: { posts, loading }, auth: { user } }) {
  useEffect(() => {
    getPosts();
  }, []);
  const [search, setSearch] = useState("");
  const [filteredSearch, setFilteredSearch] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredSearch(posts);
      const filteredPost = posts.filter((post) =>
        post.text?.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredSearch(filteredPost);
    }, 800);
    return () => clearTimeout(timer);
  }, [search, posts]);

  const searchUser = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="bg-gray-50">
      {loading ? (
        <section className="sm:w-[80%] sm:max-w-[1920px] w-[90%] mx-auto pt-25  ">
          <div className=" border border-gray-300/50 bg-white shadow-sm rounded-xl pt-8 px-10 lg:w-[30%] md:w-[80%] lg:absolute lg:mr-auto mx-auto lg:mb-0 mb-6 h-75">
            <Spinner />
          </div>
          <div className="posts lg:w-[60%] md:w-[80%] w-[100%] lg:ml-auto lg:mr-0 mx-auto ">
            <PostItemSkeleton />
          </div>
        </section>
      ) : (
        <>
          <section className="sm:w-[80%] sm:max-w-[1920px] w-[90%] mx-auto pt-25  ">
            <PostForm />
            <div className="posts lg:w-[60%] md:w-[80%] w-[100%] lg:ml-auto lg:mr-0 mx-auto ">
              {posts.length > 0 ? (
                [...posts]
                  .reverse()
                  .map((post) => <PostItem key={post._id} post={post} />)
              ) : (
                <PostItemSkeleton />
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});
export default connect(mapStateToProps, { getPosts })(Posts);
