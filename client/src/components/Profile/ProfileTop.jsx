import React, { Children, useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import Github from "./Github";
import { Link } from "react-router-dom";

function ProfileTop({
  profile: {
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
  },
}) {
  const formatUrl = (url) => {
    return url.startsWith("http") ? url : `https://${url}`;
  };

  return (
    <>
      <div className="profile-top bg-primary p-2">
        <img
          className="round-img my-1"
          src={avatar}
          alt=""
          style={{ backgroundColor: "white" }}
        />
        <h1 className="large">{name}</h1>
        <p className="lead">
          {status} {company && <span>at {company}</span>}
        </p>
        <p>{location && location}</p>
        <div className="icons my-1">
          {website && (
            <a
              href={formatUrl(website)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-globe fa-2x"></i>
            </a>
          )}
          {social && social.twitter && (
            <a
              href={formatUrl(social.twitter)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter fa-2x"></i>
            </a>
          )}
          {social && social.facebook && (
            <a
              href={formatUrl(social.facebook)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook fa-2x"></i>
            </a>
          )}
          {social && social.linkedIn && (
            <a
              href={formatUrl(social.linkedIn)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
          )}
          {social && social.youtube && (
            <a
              href={formatUrl(social.youtube)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-youtube fa-2x"></i>
            </a>
          )}
          {social && social.instagram && (
            <a
              href={formatUrl(social.instagram)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram fa-2x"></i>
            </a>
          )}
        </div>
      </div>

      <div className="profile-about bg-light p-2">
        <h2 className="text-primary">{name?.trim().split(" ")[0]}'s Bio</h2>
        <p>{bio}</p>
        <div className="line"></div>
        <h2 className="text-primary">Skill Set</h2>
        <div className="skills">
          {skills.map((skill, index) => (
            <div className="p-1" key={index}>
              <i className="fa fa-check"></i> {skill}
            </div>
          ))}
        </div>
      </div>

      <div className="profile-exp bg-white p-2">
        <h2 className="text-primary">Experience</h2>
        {experience.length > 0 ? (
          experience.map((exp) => (
            <div key={exp._id}>
              <h3 className="text-dark">{exp.company}</h3>
              <p>
                {dayjs(exp.from).format("DD/MM/YYYY")} -{" "}
                {exp.to ? dayjs(exp.to).format("DD/MM/YYYY") : "Present"}
              </p>
              <p>
                <strong>Position: </strong>
                {exp.title}
              </p>
              <p>
                <strong>Description: </strong>
                {exp.description}
              </p>
            </div>
          ))
        ) : (
          <h4>No experience records.</h4>
        )}
      </div>

      <div className="profile-edu bg-white p-2">
        <h2 className="text-primary">Education</h2>
        {education.length > 0 ? (
          education.map((edu) => (
            <div key={edu._id}>
              <h3>{edu.school}</h3>
              <p>
                {dayjs(edu.from).format("DD/MM/YYYY")} -{" "}
                {edu.to ? dayjs(edu.to).format("DD/MM/YYYY") : "Present"}
              </p>
              <p>
                <strong>Degree: </strong>
                {edu.degree}
              </p>
              <p>
                <strong>Field Of Study: </strong>
                {edu.fieldOfStudy}
              </p>
              <p>
                {edu.description && (
                  <>
                    <strong>Description: </strong> {edu.description}
                  </>
                )}
              </p>
            </div>
          ))
        ) : (
          <h4>No education records.</h4>
        )}
      </div>

      {githubUsername && <Github githubUsername={githubUsername} />}

      
    </>
  );
}

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
