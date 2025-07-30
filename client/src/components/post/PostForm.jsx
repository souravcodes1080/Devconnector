import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

function PostForm({ addPost }) {
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("text", text);

    images.forEach((file) => {
      formData.append("images", file); // backend expects `images`
    });

    addPost(formData); // should already be updated to accept FormData

    setText("");
    setImages([]);
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form className="form my-1" onSubmit={handleSubmit} encType="multipart/form-data">
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          required
          value={text}
          className="textarea-bio"
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />

        {images.length > 0 && (
          <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
            {images.map((file, i) => (
              <img
                key={i}
                src={URL.createObjectURL(file)}
                alt={`preview-${i}`}
                style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "6px" }}
              />
            ))}
          </div>
        )}

        <input type="submit" className="btn btn-dark my-1" value="Post" />
      </form>
    </div>
  );
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
