import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import { FaCamera, FaPlus, FaUser, FaXmark } from "react-icons/fa6";
import { setAlert } from "../../actions/alert";
import Spinner from "../layout/Spinner";
import { GoChevronLeft } from "react-icons/go";
const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
  auth: { user },
  setAlert,
}) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  useEffect(() => {
    getCurrentProfile();

    setFormData({
      company: loading || !profile.company ? "" : profile.company,
      website: loading || !profile.website ? "" : profile.website,
      location: loading || !profile.location ? "" : profile.location,
      status: loading || !profile.status ? "" : profile.status,
      skills: loading || !profile.skills ? "" : profile.skills.join(", "),
      githubUsername:
        loading || !profile.githubUsername ? "" : profile.githubUsername,
      bio: loading || !profile.bio ? "" : profile.bio,
      twitter:
        loading || !profile.twitter || profile.social.twitter
          ? profile.social.twitter
          : "",
      facebook:
        loading || !profile.facebook || profile.social.facebook
          ? profile.social.facebook
          : "",
      linkedIn:
        loading || !profile.linkedIn || profile.social.linkedIn
          ? profile.social.linkedIn
          : "",
      youtube:
        loading || !profile.youtube || profile.social.youtube
          ? profile.social.youtube
          : "",
      instagram:
        loading || !profile.instagram || profile.social.instagram
          ? profile.social.instagram
          : "",
    });
  }, [loading, getCurrentProfile]);
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
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (avatar) {
      data.append("avatar", avatar);
    }

    try {
      await createProfile(data, navigate, true);
      setTimeout(() => setIsSubmitting(false), 5000);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <section className="lg:w-[60%] sm:w-[80%] sm:max-w-[1920px] w-[90%] relative mx-auto min-h-[100vh] pt-25">
        <h1 className="mb-1 text-xl font-semibold text-blue-600 md:text-3xl ">
          
          Edit Your Profile
        </h1>
        <button
            onClick={() => navigate(-1)}
            className="absolute hidden px-4 py-3 transition-all duration-300 bg-white border rounded-lg shadow-sm top-25 hover:bg-gray-50 border-gray-300/10 -left-18 md:block"
          >
            <GoChevronLeft className="text-2xl " />
          </button>
        <p className="mb-5 text-base italic font-light">
          Let's get some information to make your profile stand out
        </p>

        <form className="relative" onSubmit={(e) => onSubmit(e)}>
          {isSubmitting && (
            <div className="absolute inset-0 flex items-center justify-center w-full h-full z-5 bg-white/80">
              <Spinner />
            </div>
          )}
          <div className="flex flex-col items-center gap-x-7 sm:flex-row gap-y-2">
            <div className="relative w-20 h-20 overflow-hidden rounded-full group">
              <label htmlFor="avatar">
                <img
                  src={avatarPreview ? avatarPreview : user.avatar}
                  alt="user-avatar"
                  className="object-cover w-20 h-20 rounded-full cursor-pointer"
                />
                {avatarPreview ? (
                  <FaXmark
                    className="absolute w-full h-full text-sm text-white transition-all duration-300 transform opacity-0 cursor-pointer p-7 left-1/2 top-1/2 -translate-1/2 backdrop-brightness-50 group-hover:opacity-100"
                    onClick={() => {
                      setAvatarPreview(null);
                      setAvatar(null);
                    }}
                  />
                ) : (
                  <FaCamera className="absolute w-full h-full text-sm text-white transition-all duration-300 transform opacity-0 cursor-pointer p-7 left-1/2 top-1/2 -translate-1/2 backdrop-brightness-50 group-hover:opacity-100" />
                )}

                <input
                  className="hidden"
                  id="avatar"
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const maxSize = 2 * 1024 * 1024;
                    if (file && file.size > maxSize) {
                      setAlert("File size should be less than 2MB.");
                      e.target.value = "";
                      setAvatar(null);
                      setAvatarPreview(null);
                      return;
                    }

                    setAvatar(file);
                    setAvatarPreview(URL.createObjectURL(file));
                  }}
                />
              </label>
            </div>
            <p className="text-xl font-semibold">{user.name}</p>
          </div>

          <div className="flex flex-col w-full my-7 gap-y-7">
            <div className="relative flex flex-col group">
              <select
                value={status}
                onChange={(e) => onChange(e)}
                name="status"
                className="px-4 py-2 border-2 border-blue-600 outline-none cursor-pointer group rounded-xl"
              >
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
              <small className="absolute text-blue-600 bg-white text-[14px] -bottom-2 right-7 group-active:-bottom-6 group-hover:-bottom-6 transition-all duration-100 hidden sm:block">
                Give us an idea of where you are at in your career
              </small>
            </div>
            <div className="relative flex flex-col group">
              <input
                type="text"
                placeholder="* Company or School"
                name="company"
                value={company}
                onChange={(e) => onChange(e)}
                className="px-4 py-2 border-2 border-blue-600 outline-none cursor-pointer group rounded-xl"
              />
              <small className="absolute text-blue-600 bg-white text-[14px] -bottom-2 right-7 group-active:-bottom-6 group-hover:-bottom-6 transition-all duration-100 hidden sm:block">
                Could be your own company or one you work for
              </small>
            </div>
            <div className="relative flex flex-col group">
              <input
                type="text"
                placeholder="Website Link"
                name="website"
                value={website}
                onChange={(e) => onChange(e)}
                className="px-4 py-2 border-2 border-blue-600 outline-none cursor-pointer group rounded-xl"
              />
              <small className="absolute text-blue-600 bg-white text-[14px] -bottom-2 right-7 group-active:-bottom-6 group-hover:-bottom-6 transition-all duration-100 hidden sm:block">
                Could be your own or a company website
              </small>
            </div>
            <div className="relative flex flex-col group">
              <input
                type="text"
                placeholder="* City, State"
                name="location"
                value={location}
                onChange={(e) => onChange(e)}
                className="px-4 py-2 border-2 border-blue-600 outline-none cursor-pointer group rounded-xl"
              />
              <small className="absolute text-blue-600 bg-white text-[14px] -bottom-2 right-7 group-active:-bottom-6 group-hover:-bottom-6 transition-all duration-100 hidden sm:block">
                City & state suggested (eg. Boston, MA)
              </small>
            </div>
            <div className="relative flex flex-col group">
              <input
                type="text"
                placeholder="* Skills (HTML, CSS)"
                name="skills"
                value={skills}
                onChange={(e) => onChange(e)}
                className="px-4 py-2 border-2 border-blue-600 outline-none cursor-pointer group rounded-xl"
              />
              <small className="absolute text-blue-600 bg-white text-[14px] -bottom-2 right-7 group-active:-bottom-6 group-hover:-bottom-6 transition-all duration-100 hidden sm:block">
                Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
              </small>
            </div>
            <div className="relative flex flex-col group">
              <input
                type="text"
                placeholder="Github Username"
                name="githubUsername"
                value={githubUsername}
                onChange={(e) => onChange(e)}
                className="px-4 py-2 border-2 border-blue-600 outline-none cursor-pointer group rounded-xl"
              />
              <small className="absolute text-blue-600 bg-white text-[14px] -bottom-2 right-7 group-active:-bottom-6 group-hover:-bottom-6 transition-all duration-100 hidden sm:block">
                If you want your latest repos and a Github link, include your
                username
              </small>
            </div>
            <div className="relative flex flex-col group">
              <textarea
                placeholder="A short bio of yourself"
                name="bio"
                onChange={(e) => onChange(e)}
                value={bio}
                className="px-4 py-2 border-2 border-blue-600 outline-none cursor-pointer resize-none group rounded-xl"
              ></textarea>
              <small className="absolute text-blue-600 bg-white text-[14px] -bottom-2 right-7 group-active:-bottom-6 group-hover:-bottom-6 transition-all duration-100 hidden sm:block">
                Tell us a little about yourself
              </small>
            </div>

            <div className="flex items-end my-2 gap-x-2">
              <button
                onClick={() => toggleSocialInputs(!displaySocialInputs)}
                type="button"
                className="flex items-center px-5 py-2 bg-gray-200 cursor-pointer rounded-xl gap-x-2"
              >
                <FaPlus className="" />{" "}
                <span className="hidden sm:block">Add</span> Social
                <span className="hidden sm:block">Network</span> Links
              </button>
              <small className="font-light">(Optional)</small>
            </div>
            {displaySocialInputs && (
              <>
                <div className="flex items-center gap-x-2">
                  <i className="fab fa-twitter fa-2x"></i>
                  <input
                    type="text"
                    placeholder="Twitter URL"
                    name="twitter"
                    value={twitter}
                    onChange={(e) => onChange(e)}
                    className="w-full px-4 py-2 border-2 border-blue-600 outline-none cursor-pointer group rounded-xl"
                  />
                </div>

                <div className="flex items-center gap-x-2">
                  <i className="fab fa-facebook fa-2x"></i>
                  <input
                    type="text"
                    placeholder="Facebook URL"
                    name="facebook"
                    value={facebook}
                    onChange={(e) => onChange(e)}
                    className="w-full px-4 py-2 border-2 border-blue-600 outline-none cursor-pointer group rounded-xl"
                  />
                </div>

                <div className="flex items-center gap-x-2">
                  <i className="fab fa-youtube fa-2x"></i>
                  <input
                    type="text"
                    placeholder="YouTube URL"
                    name="youtube"
                    value={youtube}
                    onChange={(e) => onChange(e)}
                    className="w-full px-4 py-2 border-2 border-blue-600 outline-none cursor-pointer group rounded-xl"
                  />
                </div>

                <div className="flex items-center gap-x-2">
                  <i className="fab fa-linkedin fa-2x"></i>
                  <input
                    type="text"
                    placeholder="linkedIn URL"
                    name="linkedIn"
                    value={linkedIn}
                    onChange={(e) => onChange(e)}
                    className="w-full px-4 py-2 border-2 border-blue-600 outline-none cursor-pointer group rounded-xl"
                  />
                </div>

                <div className="flex items-center gap-x-2">
                  <i className="fab fa-instagram fa-2x"></i>
                  <input
                    type="text"
                    placeholder="Instagram URL"
                    name="instagram"
                    value={instagram}
                    onChange={(e) => onChange(e)}
                    className="w-full px-4 py-2 border-2 border-blue-600 outline-none cursor-pointer group rounded-xl"
                  />
                </div>
              </>
            )}
          </div>

          <input
            value={"Confirm"}
            type="submit"
            className="flex justify-end w-auto px-4 py-2 m-auto my-1 mb-4 text-right text-white bg-blue-600 cursor-pointer rounded-xl"
          />
        </form>
      </section>
    </div>
  );
};
EditProfile.PropTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.object.isRequired,
};

const mapStateToProp = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProp, {
  createProfile,
  getCurrentProfile,
  setAlert,
})(EditProfile);
