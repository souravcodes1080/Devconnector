import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import { LuImagePlus } from "react-icons/lu";
import { FaTrashAlt } from "react-icons/fa";
import { setAlert } from "../../actions/alert";
import { useNavigate } from "react-router-dom";
function PostForm({ addPost, setAlert, auth: { user } }) {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [posting, setPosting] = useState(false);
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const maxSize = 5 * 1024 * 1024; // 5MB
    const validFiles = [];
    let oversized = false;

    for (let file of selectedFiles) {
      if (file.size > maxSize) {
        oversized = true;
        continue;
      }
      validFiles.push(file);
    }
    if (oversized) {
      setAlert("One or more files exceeded 5MB and were not added.");
    }
    if (validFiles.length + images.length > 5) {
      setAlert("Total selected images cannot be more than 5.");
      return;
    }
    setImages((prev) => [...prev, ...validFiles]);
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

  return (
    <>
      <div className=" border border-gray-300/50 bg-white shadow-sm rounded-xl pt-5 md:pt-8 px-5 md:px-10 lg:w-[30%] md:w-[80%] lg:absolute lg:mr-auto mx-auto lg:mb-0 mb-6">
        <div className="flex items-center w-full gap-x-5">
          <img
            onClick={() => navigate(`/profile/${user._id}`)}
            src={user.avatar}
            alt=""
            className="rounded-full w-[60px] h-[60px] object-cover cursor-pointer"
          />
          <div className="flex-1 min-w-0">
            <h4 className="w-full text-xl truncate ">{user.name}</h4>
            <p className="font-thin">Create a post</p>
          </div>
        </div>
        <div className="w-full py-4 bg-white rounded-full outline-none cursor-text">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            name=""
            id=""
            className="w-full px-3 py-2 bg-gray-100 outline-none resize-none rounded-xl"
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
        <div className="flex items-center justify-end pb-6 gap-x-3">
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
            className="p-2 text-white transition-all duration-300 bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700"
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
            className="px-5 py-2 text-base font-semibold text-white transition-all duration-300 bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700"
            onClick={handleSubmit}
          >
            {posting ? (
              <div className="py-0.5">
                <svg
                  className="w-5 h-5 text-white animate-spin"
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
              </div>
            ) : (
              "Post"
            )}{" "}
          </button>
        </div>
      </div>
    </>
  );
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { addPost, setAlert })(PostForm);
