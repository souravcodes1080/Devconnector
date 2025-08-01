import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link, Links } from "react-router-dom";
import { connect } from "react-redux";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);
import { addLike, deletePost, removeLike } from "../../actions/post";
import { AiOutlineMessage, AiOutlineUserAdd } from "react-icons/ai";
import { FaPlus, FaRegThumbsUp, FaShare, FaThumbsUp } from "react-icons/fa6";
import { MdMessage } from "react-icons/md";
import { BiSolidHeartCircle } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

function PostItem({
  post: { _id, text, name, user, likes, comments, date, avatar, images },
  auth,
  addLike,
  removeLike,
  deletePost,
  showActions,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault(); // Now it works!
        el.scrollLeft += e.deltaY;
      }
    };

    if (el) {
      el.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (el) {
        el.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);
  return (
    <>
      <div className="px-10 pt-8 my-5 mt-0 bg-white border shadow-sm border-gray-300/50 rounded-xl">
        <div className="flex items-center justify-between mb-5 sm:items-start">
          <Link to={`/profile/${user}`} className="flex items-center gap-x-5">
            <img
              src={avatar}
              alt=""
              className="bg-gray-100 rounded-full w-15"
            />
            <div>
              <p className="text-base font-semibold sm:text-lg">{name}</p>
              <p className="text-base font-light">
                {dayjs(date).format("Do MMM YYYY")}
              </p>
            </div>
          </Link>
          {/* <button className="flex items-center font-semibold text-blue-600 transition-all duration-300 rounded-lg cursor-pointer gap-x-2 hover:text-blue-700">
            <FaPlus /> <span className="hidden sm:block text-md">connect</span>
          </button> */}
          {/* DROPDOWN LOGIC for post owner */}
          {auth.user && auth.user._id === user ? (
            <div className="relative">
              <button
                className="flex items-center font-semibold transition-all duration-300 rounded-lg cursor-pointer gap-x-2 hover:text-blue-700"
                onClick={() => setShowMenu((prev) => !prev)}
              >
                <BsThreeDotsVertical />
              </button>

              {showMenu && (
                <div className="absolute right-0 z-10 w-40 mt-2 bg-white shadow-md rounded-xl">
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      if (
                        window.confirm(
                          "Are you sure you want to delete this post?"
                        )
                      ) {
                        deletePost(_id);
                      }
                    }}
                    className="w-full px-4 py-3 text-sm text-left text-red-600 hover:bg-red-50"
                  >
                    Delete Post
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="flex items-center font-semibold transition-all duration-300 rounded-lg cursor-pointer gap-x-2 hover:text-blue-700">
              <BsThreeDotsVertical />
            </button>
          )}
        </div>
        <p className="mb-5 text-base whitespace-pre-line sm:text-lg">{text}</p>
        <div className="flex overflow-x-auto gap-x-5 hide-scrollbar">
          {images.length > 0 ? (
            <>
              <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-x-3 hide-scrollbar"
              >
                {images.map((image, i) => (
                  <img
                    loading="lazy"
                    key={i}
                    src={image}
                    className="flex-shrink-0 object-cover rounded-lg w-60 h-60"
                    alt={`post-img-${i}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="flex items-center justify-between mt-5 mb-5">
          <div className="flex items-center text-gray-500 gap-x-1">
            <BiSolidHeartCircle className="text-2xl text-red-700" />
            <span>{likes.length}</span> {likes.length > 1 ? "Likes" : "Like"}
          </div>
          <div className="flex items-center text-gray-500 gap-x-1">
            <AiOutlineMessage className="text-xl text-black" />
            <span>{comments.length}</span>{" "}
            {comments.length > 1 ? "Comments" : "Comment"}
          </div>
        </div>
        {showActions && <>
          <hr className="opacity-15" />
          <div className="flex items-center justify-between my-2 mb-4">
            <button
              className="flex items-center py-2 rounded-full cursor-pointer gap-x-3 hover:bg-gray-100 px-7"
              onClick={() => {
                const alreadyLiked = likes.some(
                  (like) => like.user === auth.user._id
                );
                alreadyLiked ? removeLike(_id) : addLike(_id);
              }}
            >
              {likes.some((like) => like.user === auth.user._id) ? (
                <FaThumbsUp className="text-blue-600" />
              ) : (
                <FaRegThumbsUp />
              )}
              <span className="hidden sm:block">
                {likes.some((like) => like.user === auth.user._id)
                  ? "Liked"
                  : "Like"}
              </span>
            </button>

            <Link
              to={`/posts/${_id}`}
              className="flex items-center py-2 rounded-full cursor-pointer gap-x-3 hover:bg-gray-100 px-7"
            >
              <MdMessage />
              <span className="hidden sm:block">Comment</span>
            </Link>
            <button className="flex items-center py-2 rounded-full cursor-pointer gap-x-3 hover:bg-gray-100 px-7">
              <FaShare />
              <span className="hidden sm:block">Share</span>
            </button>
          </div>
        </>}
        
      </div>
    </>
  );
}
PostItem.defaultProps = {
  showActions: true,
};
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

{
  /* <div>
      <div className="p-1 my-1 bg-white post">
        <div>
          <Link to={`/profile/${user}`}>
            <img className="round-img" src={avatar} alt="" />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{text}</p>
          {images.length > 0 ? (
            <>
              {images.map((image) => (
                <img
                  src={image}
                  style={{
                    margin: "5px",
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              ))}
            </>
          ) : (
            <></>
          )}
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
    </div> */
}
