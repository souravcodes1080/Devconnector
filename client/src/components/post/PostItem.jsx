import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { addLike, deletePost, removeLike } from "../../actions/post";
function PostItem({
  post: { _id, text, name, user, likes, comments, date, avatar },
  auth,
  addLike,
  removeLike,
  deletePost,
  showActions,
}) {
  return (
    <div>
      {" "}
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img className="round-img" src={avatar} alt="" />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">
            Posted on {dayjs(date).format("DD/MM/YYYY")}
          </p>
          {showActions && (
            <>
              <button
                onClick={(e) => addLike(_id)}
                type="button"
                className="btn btn-light"
              >
                <i className="fas fa-thumbs-up"></i>
                <span>{likes.length > 0 && <span> {likes.length}</span>}</span>
              </button>
              <button
                onClick={(e) => removeLike(_id)}
                type="button"
                className="btn btn-light"
              >
                <i className="fas fa-thumbs-down"></i>
              </button>

              <Link to={`/posts/${_id}`} className="btn btn-primary">
                Discussion{" "}
                {comments.length > 0 && (
                  <span className="comment-count">{comments.length}</span>
                )}
              </Link>
              {!auth.loading && user === auth.user._id && (
                <button
                  type="button"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete the post?"
                      )
                    )
                      deletePost(_id);
                  }}
                  className="btn btn-danger"
                >
                  <i className="fas fa-times"></i> Remove Post
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
PostItem.defaultProps = {
  showActions : true
}
PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
