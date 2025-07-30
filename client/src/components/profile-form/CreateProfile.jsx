import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createProfile } from "../../actions/profile";
const CreateProfile = ({createProfile, history}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubUsername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedIn: "",
    youtube: "",
    instagram: "",
  });
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const {
    company,
    website,
    location,
    status,
    skills,
    githubUsername,
    bio,
    twitter,
    facebook,
    linkedIn,
    youtube,
    instagram,
  } = formData;
  const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
  
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = e =>{
  e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (avatar) {
      data.append("avatar", avatar);
      for (let pair of data.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
    }
    createProfile(data, navigate, true);
  }
  return (
    <div>
      <section className="container">
        <h1 className="large text-primary">Create Your Profile</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Let's get some information to make
          your profile stand out
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={(e)=>onSubmit(e)}><div className="form-group">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];

                // Check file size (in bytes): 2MB = 2 * 1024 * 1024
                const maxSize = 2 * 1024 * 1024;

                if (file && file.size > maxSize) {
                  alert("File size should be less than 2MB.");
                  e.target.value = ""; // Reset the file input
                  setAvatar(null);
                  setAvatarPreview(null);
                  return;
                }

                setAvatar(file);
                setAvatarPreview(URL.createObjectURL(file));
              }}
            />

            <small className="form-text">
              Upload a profile picture (max 2MB)
            </small>
          </div>

          {avatarPreview && (
            <div style={{ marginBottom: "15px" }}>
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "100px",
                  objectFit: "cover",
                }}
              />
            </div>
          )}
          <div className="form-group">
            <select value={status} onChange={(e) => onChange(e)} name="status">
              <option value="0">* Select Professional Status</option>
              <option value="Developer">Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor">Instructor or Teacher</option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
            <small className="form-text">
              Give us an idea of where you are at in your career
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Company"
              name="company"
              value={company}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              Could be your own company or one you work for
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Website"
              name="website"
              value={website}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              Could be your own or a company website
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={location}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              City & state suggested (eg. Boston, MA)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Skills"
              name="skills"
              value={skills}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Github Username"
              name="githubUsername"
              value={githubUsername}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              If you want your latest repos and a Github link, include your
              username
            </small>
          </div>
          <div className="form-group">
            <textarea
              placeholder="A short bio of yourself"
              name="bio"
              className="textarea-bio"
              onChange={(e) => onChange(e)}
              value={bio}
            ></textarea>
            <small className="form-text">Tell us a little about yourself</small>
          </div>

          <div className="my-2">
            <button
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
              type="button"
              className="btn btn-light"
            >
              Add Social Network Links
            </button>
            <span>Optional</span>
          </div>
          {displaySocialInputs && (
            <>
              <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input
                  type="text"
                  placeholder="Twitter URL"
                  name="twitter"
                  value={twitter}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input
                  type="text"
                  placeholder="Facebook URL"
                  name="facebook"
                  value={facebook}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input
                  type="text"
                  placeholder="YouTube URL"
                  name="youtube"
                  value={youtube}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x"></i>
                <input
                  type="text"
                  placeholder="linkedIn URL"
                  name="linkedIn"
                  value={linkedIn}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input
                  type="text"
                  placeholder="Instagram URL"
                  name="instagram"
                  value={instagram}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </>
          )}

          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </section>
    </div>
  );
};
CreateProfile.PropTypes = {
  createProfile: PropTypes.func.isRequired,
}

// const mapStateToProp = state => ({

// })

export default connect(null, {createProfile})(CreateProfile);
