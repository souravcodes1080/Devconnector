import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { addComment, deleteComment, getPost } from "../../actions/post";
import { Link, useParams } from "react-router-dom";
import PostItem from "./PostItem";
import { GoPaperAirplane } from "react-icons/go";

import dayjs from "dayjs";
import { FaChevronLeft } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoChevronLeft } from "react-icons/go";

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
  const [activeMenu, setActiveMenu] = useState(null);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <div className="bg-gray-50">
      <div className="sm:w-[80%] sm:max-w-[1920px] w-[90%] mx-auto pt-25  ">
        <section className="container">
          <div className="posts lg:w-[60%] md:w-[80%] w-[100%]  mx-auto relative">
            <PostItem showActions={false} post={post} />
            <Link
              to="/posts"
              className="absolute top-0 hidden px-4 py-3 transition-all duration-300 bg-white border rounded-lg shadow-sm hover:bg-gray-50 border-gray-300/10 -left-17 md:block"
            >
              <GoChevronLeft  className="text-2xl " />
            </Link>
            <div className="post-form">
              <div className="pt-7 ">
                <h3 className="text-xl font-semibold md:text-2xl">
                  Leave a comment
                </h3>
              </div>
              <form
                className="flex items-center pb-4 my-3 gap-x-1"
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log({ text });
                  addComment(id, { text });
                  setComment("");
                }}
              >
                <img
                  src={auth.user.avatar}
                  alt="user_pfp"
                  className="w-12 h-12 mr-3 rounded-full"
                />
                <input
                  name="text"
                  type="text"
                  placeholder="Comment on this post"
                  required
                  className="w-full px-4 py-2 bg-white border rounded-full outline-none resize-none border-gray-600/50"
                  value={text}
                  onChange={(e) => setComment(e.target.value)}
                ></input>

                {text.length > 0 && (
                  <button
                    type="submit"
                    className="px-3 py-3 text-xl transition-all duration-300 rounded-full cursor-pointer hover:bg-gray-100"
                  >
                    <GoPaperAirplane />
                  </button>
                )}
              </form>
            </div>
            <div className="comments">
              {post.comments.map((comment) => (
                <div
                  key={comment._id}
                  className="px-10 pt-8 my-5 mt-0 bg-white border shadow-sm border-gray-300/50 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-5 sm:items-start">
                    <Link
                      to={`/profile/${comment.user}`}
                      className="flex items-center gap-x-5"
                    >
                      <img
                        src={comment.avatar}
                        alt=""
                        className="bg-gray-100 rounded-full w-15"
                      />
                      <div>
                        <p className="text-base font-semibold sm:text-lg">
                          {comment.name}
                        </p>
                        <p className="text-base font-light">
                          {dayjs(comment.date).format("Do MMM YYYY")}
                        </p>
                      </div>
                    </Link>
                    {/* <button className="flex items-center font-semibold text-blue-600 transition-all duration-300 rounded-lg cursor-pointer gap-x-2 hover:text-blue-700">
            <FaPlus /> <span className="hidden sm:block text-md">connect</span>
          </button> */}
                    {/* DROPDOWN LOGIC for post owner */}
                    {auth.user && auth.user._id === comment.user ? (
                      <div className="relative">
                        <button
                          className="flex items-center font-semibold transition-all duration-300 rounded-lg cursor-pointer gap-x-2 hover:text-blue-700"
                          onClick={() =>
                            setActiveMenu((prev) =>
                              prev === comment._id ? null : comment._id
                            )
                          }
                        >
                          <BsThreeDotsVertical />
                        </button>

                        {activeMenu === comment._id && (
                          <div className="absolute right-0 z-10 w-40 mt-2 bg-white shadow-md rounded-xl">
                            <button
                              onClick={() => {
                                setActiveMenu(null);
                                if (
                                  window.confirm(
                                    "Are you sure you want to delete this comment?"
                                  )
                                ) {
                                   deleteComment(post._id, comment._id);
                                }
                              }}
                              className="w-full px-4 py-3 text-sm text-left text-red-600 hover:bg-red-50"
                            >
                              Delete Comment
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
                  <p className="mb-5 text-base whitespace-pre-line sm:ml-20 sm:text-lg">
                    {comment.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
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
//  <div className="p-1 my-1 bg-white post" key={comment._id}>
//                   <div>
//                     <Link to={`/profile/${comment.user}`}>
//                       <img className="round-img" src={comment.avatar} alt="" />
//                       <h4>{comment.name}</h4>
//                     </Link>
//                   </div>
//                   <div>
//                     <p className="my-1">{comment.text}</p>
//                     <p className="post-date">
//                       Posted on {dayjs(comment.date).format("DD/MM/YYYY")}
//                     </p>
//                     {!auth.loading && comment.user === auth.user._id && (
//                       <button
//                         className="btn btn-danger"
//                         type="button"
//                         onClick={() => deleteComment(id, comment._id)}
//                       >
//                         <i className="fas fa-times"></i> Delete Comment
//                       </button>
//                     )}
//                   </div>
//                 </div>
