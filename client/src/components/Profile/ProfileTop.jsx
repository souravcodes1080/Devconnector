import React, { Children, useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import Github from "./Github";
import { Link, useNavigate } from "react-router-dom";
import FollowersItem from "./FollowersItem";
import {
  FaCheck,
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaPlus,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { FiEdit3 } from "react-icons/fi";
import { connect } from "react-redux";
import { LuDot } from "react-icons/lu";

function ProfileTop({ profile, auth, id, user }) {
  const navigate = useNavigate();
  if (!profile || !profile.user) {
    const fallbackAvatar = user?.avatar;
    const fallbackName = user?.name;
    return (
      <div className="overflow-hidden bg-white border shadow-sm border-gray-300/50 rounded-xl">
        <div className="relative w-full bg-gray-200 md:h-40 h-30 ">
          <img
            className="absolute transform -translate-x-1/2 border-white rounded-full h-35 w-35 md:-translate-x-0 border-5 left-1/2 top-1/2 md:top-10 md:left-10 md:w-50 md:h-50"
            src={fallbackAvatar}
            alt="fallback-avatar"
          />
        </div>
        <div className="px-5 pb-5 md:pb-10 md:px-10">
          <h1 className="flex items-center justify-between text-3xl font-semibold mt-23 gap-x-3">
            {fallbackName}{" "}
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === id && (
                <FiEdit3
                  className="cursor-pointer hover:text-blue-700"
                  onClick={() => navigate("/create-profile")}
                />
              )}{" "}
          </h1>
          <p className="italic text-gray-500">No profile info available</p>
        </div>
      </div>
    );
  }

  // Destructure only if profile exists
  const {
    status,
    company,
    location,
    website,
    social,
    bio,
    skills,
    experience,
    education,
    githubUsername,
    user: { name, avatar },
  } = profile;
  const formatUrl = (url) => {
    return url.startsWith("http") ? url : `https://${url}`;
  };

  return (
    <>
      <>
        <div className="overflow-hidden bg-white border shadow-sm border-gray-300/50 rounded-xl">
          <div className="relative w-full bg-blue-600 border border-blue-600 h-30 md:h-40">
            <img
              className="absolute transform -translate-x-1/2 border-white rounded-full h-35 w-35 md:-translate-x-0 border-5 left-1/2 top-1/2 md:top-10 md:left-10 md:w-50 md:h-50"
              src={avatar}
              alt={avatar}
            />
          </div>
          <div className="px-5 pb-5 md:pb-10 md:px-10">
            <div className="flex flex-col items-baseline justify-between md:flex-row">
              <h1 className="flex items-center text-2xl font-semibold md:text-3xl mt-23 gap-x-3">
                {name}{" "}
                {auth.isAuthenticated &&
                  auth.loading === false &&
                  auth.user._id === id && (
                    <FiEdit3
                      className="cursor-pointer hover:text-blue-700"
                      onClick={() => {
                        navigate("/edit-profile");
                      }}
                    />
                  )}{" "}
              </h1>
              <div className="flex items-center py-2 text-xl text-blue-600 md:py-0 gap-x-2">
                {website && (
                  <a
                    href={formatUrl(website)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGlobe />
                  </a>
                )}
                {social && social.twitter && (
                  <a
                    href={formatUrl(social.twitter)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter />
                  </a>
                )}
                {social && social.facebook && (
                  <a
                    href={formatUrl(social.facebook)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook />
                  </a>
                )}
                {social && social.linkedIn && (
                  <a
                    href={formatUrl(social.linkedIn)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin />
                  </a>
                )}
                {social && social.youtube && (
                  <a
                    href={formatUrl(social.youtube)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaYoutube className="text-2xl" />
                  </a>
                )}
                {social && social.instagram && (
                  <a
                    href={formatUrl(social.instagram)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram />
                  </a>
                )}
              </div>
            </div>
            <p className="lead">
              {status} {company && <span>at {company}</span>}
            </p>
            <div className="flex items-center justify-between">
              <p className="font-light">{location && location}</p>
              {auth.isAuthenticated &&
                auth.loading === false &&
                auth.user._id !== id && (
                  <button className="text-blue-600 cursor-pointer">
                    Follow +
                  </button>
                )}
            </div>
          </div>
        </div>
      </>

      <div className="px-5 py-5 my-4 bg-white border shadow-sm md:py-10 md:px-10 profile-about bg-light border-gray-300/50 rounded-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl">{name?.trim().split(" ")[0]}'s Bio</h2>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === id && (
              <FiEdit3 onClick={()=>navigate('/edit-profile')} className="text-xl cursor-pointer hover:text-blue-700" />
            )}
        </div>
        <p className="mt-2 text-gray-500">{bio} </p>
        <div className="py-5">
          <hr className="opacity-25" />
        </div>
        <h2 className="text-2xl">Skills Set</h2>
        <div className="flex flex-wrap w-full my-2 md:w-110 sm:w-80 gap-x-7">
          {skills.map((skill, index) => (
            <div className="flex items-center gap-x-2" key={index}>
              <FaCheck className="text-green-500" /> {skill}
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 py-5 my-4 bg-white border shadow-sm md:py-10 md:px-10 profile-about bg-light border-gray-300/50 rounded-xl">
        <div className="flex items-center justify-between">
          <h2 className="mb-2 text-2xl">Experience</h2>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === id && (
              <FaPlus
                onClick={() => navigate("/add-experience")}
                className="text-xl cursor-pointer hover:text-blue-700"
              />
            )}{" "}
        </div>
        {experience.length > 0 ? (
          experience.map((exp, i) => (
            <div key={exp._id}>
              <h3 className="text-lg font-semibold">{exp.company}</h3>
              <p className="">
                {dayjs(exp.from).format("DD/MM/YYYY")} -{" "}
                {exp.to ? dayjs(exp.to).format("DD/MM/YYYY") : "Present"}
              </p>
              <p className="italic font-light">{exp.title}</p>
              <p>{exp.description}</p>
              {i !== experience.length - 1 && (
                <hr className="mt-4 mb-3 opacity-25" />
              )}
            </div>
          ))
        ) : (
          <h4>No experience records.</h4>
        )}
      </div>

      <div className="px-5 py-5 my-4 bg-white border shadow-sm md:py-10 md:px-10 profile-about bg-light border-gray-300/50 rounded-xl">
        <div className="flex items-center justify-between">
          <h2 className="mb-2 text-2xl">Education</h2>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === id && (
              <FaPlus
                onClick={() => navigate("/add-education")}
                className="text-xl cursor-pointer hover:text-blue-700"
              />
            )}{" "}
        </div>
        {education.length > 0 ? (
          education.map((edu, i) => (
            <div key={edu._id}>
              <h3 className="text-lg font-semibold">{edu.school}</h3>
              <p className="">
                {dayjs(edu.from).format("DD/MM/YYYY")} -{" "}
                {edu.to ? dayjs(edu.to).format("DD/MM/YYYY") : "Present"}
              </p>
              <div className="flex items-center italic font-light gap-x-0">
                <p>{edu.degree}</p>
                <LuDot />
                <p>{edu.fieldOfStudy}</p>
              </div>

              <p>{edu.description && <>{edu.description}</>}</p>
              {i !== education.length - 1 && (
                <hr className="mt-4 mb-3 opacity-25" />
              )}
            </div>
          ))
        ) : (
          <h4>No education records.</h4>
        )}
      </div>

      {/* {githubUsername && <Github githubUsername={githubUsername} />} */}
    </>
  );
}

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(ProfileTop);
