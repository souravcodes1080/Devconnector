import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import { LuImagePlus } from "react-icons/lu";
import DashboardNavbar from "../dashboard/DashboardNavbar";
import { HiMiniXMark } from "react-icons/hi2";
import { FaTrashAlt } from "react-icons/fa";
import PostItemSkeleton from "./PostItemSkeleton";
import { addPost } from "../../actions/post";
function Posts({
  getPosts,
  post: { posts, loading },
  auth: { user },
  addPost,
}) {
  useEffect(() => {
    getPosts();
  }, []);
  const [search, setSearch] = useState("");
  const [filteredSearch, setFilteredSearch] = useState([]);
  const [posting, setPosting] = useState(false);
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };
  const handleSubmit = async () => {
    if (!text.trim() && images.length === 0) return;

    setPosting(true);
    const formData = new FormData();
    formData.append("text", text);
    images.forEach((file) => {
      formData.append("images", file);
    });
    try {
      await addPost(formData);
      setText("");
      setImages([]);
    } catch (err) {
      console.error("Error posting:", err);
    } finally {
      setPosting(false);
    }
  };

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
      <DashboardNavbar />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="sm:w-[80%] sm:max-w-[1920px] w-[90%] mx-auto pt-25  ">
            <div className=" border border-gray-300/50 bg-white shadow-sm rounded-xl pt-8 px-10 lg:w-[30%] md:w-[80%] lg:absolute lg:mr-auto mx-auto lg:mb-0 mb-6">
              <div className="flex items-center gap-x-5 w-full">
                <img
                  src={user.avatar}
                  alt=""
                  className="rounded-full w-[60px] h-[60px] object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xl truncate w-full ">{user.name}</h4>
                  <p className="font-thin">Create a post</p>
                </div>
              </div>
              <div className="bg-white w-full rounded-full py-4 outline-none cursor-text">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  name=""
                  id=""
                  className="px-3 py-2 bg-gray-100 w-full rounded-xl outline-none resize-none"
                  placeholder="I was thinking..."
                  resize="none"
                  rows={7}
                ></textarea>
              </div>
              {images.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  {images.map((file, i) => (
                    <img
                      key={i}
                      src={URL.createObjectURL(file)}
                      alt={`preview-${i}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                  ))}
                </div>
              )}
              <div className="flex items-center gap-x-3 justify-end pb-6">
                {images.length > 0 ? (
                  <FaTrashAlt
                    onClick={() => setImages([])}
                    className="text-xl cursor-pointer"
                  />
                ) : (
                  <></>
                )}

                <label
                  htmlFor="image-upload"
                  className="  bg-blue-600 transition-all duration-300 hover:bg-blue-700 text-white p-2 rounded-lg cursor-pointer"
                >
                  <LuImagePlus className="text-2xl" />

                  <input
                    id="image-upload"
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
                <button
                  disabled={posting}
                  className=" bg-blue-600 text-white py-2 px-5 rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-blue-700"
                  onClick={handleSubmit}
                >
                  {posting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8h4z"
                        ></path>
                      </svg>
                    </>
                  ) : (
                    "Post"
                  )}{" "}
                </button>
              </div>
            </div>
            <div className="posts lg:w-[60%] md:w-[80%] w-[100%] lg:ml-auto lg:mr-0 mx-auto ">
              {posts.length > 0 ? (
                posts.reverse()
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
  addPost: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});
export default connect(mapStateToProps, { getPosts, addPost })(Posts);
