import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addFollower } from "../../actions/profile";
function ProfileItem({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
  auth,
  addFollower,
}) {
 
  return (
    <div className="profile bg-light">
      <img
        src={avatar}
        className="round-img"
        style={{ backgroundColor: "white" }}
        alt="avatar"
      />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span>at {company}</span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
        {auth.user && _id !== auth.user._id && (
        <button
          className="btn btn-primary"
          onClick={() => {
            addFollower(_id);
          }}
        >
          <i className="fas fa-add"></i>
        </button>
         )}
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check"></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addFollower: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addFollower })(ProfileItem);
