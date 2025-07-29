import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

function Posts({ getPosts, post: { posts, loading } }) {
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

  return loading ? (
    <Spinner />
  ) : (
    <>
      <div className="container">
        <h1 className="large text-primary">Posts</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome to the comminity
        </p>
        <PostForm />
        <div className="form-group">
          <input
            type="text"
            placeholder="Search through posts"
            name="search"
            value={search}
            onChange={(e) => searchUser(e)}
            className="my-1 p-1"
            style={{ width: "100%", fontSize: "16px" }}
          />
        </div>
        <div className="posts">
          {filteredSearch.length > 0 ? (
            filteredSearch
              .reverse()
              .map((post) => <PostItem key={post._id} post={post} />)
          ) : (
            <h4>No Post Found.</h4>
          )}
        </div>
      </div>
    </>
  );
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPosts })(Posts);
