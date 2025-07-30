import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { addComment, deleteComment, getPost } from "../../actions/post";
import { Link, useParams } from "react-router-dom";
import PostItem from "./PostItem";
import dayjs from "dayjs";
function Post({
  auth,
  getPost,
  addComment,
  deleteComment,
  post: { loading, post },
}) {
  const { id } = useParams();
  useEffect(() => {
    getPost(id);
  }, [getPost]);
  const [text, setComment] = useState("");
  return loading || post === null ? (
    <Spinner />
  ) : (
    <>
      <div className="">
        <section className="container">
          <Link to="/posts" className="btn">
            Back To Posts
          </Link>
          <PostItem showActions={false} post={post} />

          <div className="post-form">
            <div className="bg-primary p">
              <h3>Leave A Comment</h3>
            </div>
            <form
              className="form my-1"
              onSubmit={(e) => {
                e.preventDefault();
                console.log({ text });
                addComment(id, { text });
                setComment("");
              }}
            >
              <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="Comment on this post"
                required
                className="textarea-bio"
                value={text}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <input
                type="submit"
                className="btn btn-dark my-1"
                value="Submit"
              />
            </form>
          </div>
          <div className="comments">
            {post.comments.map((comment) => (
              <div className="post bg-white p-1 my-1" key={comment._id}>
                <div>
                  <Link to={`/profile/${comment.user}`}>
                    <img className="round-img" src={comment.avatar} alt="" />
                    <h4>{comment.name}</h4>
                  </Link>
                </div>
                <div>
                  <p className="my-1">{comment.text}</p>
                  <p className="post-date">
                    Posted on {dayjs(comment.date).format("DD/MM/YYYY")}
                  </p>
                  {!auth.loading && comment.user === auth.user._id && (
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => deleteComment(id, comment._id)}
                    >
                      <i className="fas fa-times"></i> Delete Comment
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});
export default connect(mapStateToProps, { getPost, addComment, deleteComment })(
  Post
);
