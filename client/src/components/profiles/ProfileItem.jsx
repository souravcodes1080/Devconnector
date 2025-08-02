import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addFollower } from "../../actions/profile";
import { RiUserAddLine } from "react-icons/ri";

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
  const bannerColors = [
  "bg-blue-400",
  "bg-emerald-400",
  "bg-amber-300",
  "bg-violet-400",
  "bg-rose-300",
  "bg-emerald-400",
  "bg-red-200",
  "bg-slate-400",
];

const randomColor = bannerColors[Math.floor(Math.random() * bannerColors.length)];

  return (
    <div className="relative px-5 pt-5 pb-5 mt-0 mb-5 overflow-hidden bg-white border shadow-sm y-5 md:pt-8 md:pb-10 md:px-10 border-gray-300/50 rounded-xl">
      <div className={`absolute top-0 right-0 w-full md:h-30 h-20 ${randomColor}`}></div>

      <img
        src={avatar}
        className="absolute z-20 w-20 h-20 mx-auto transform translate-x-1/2 border-2 border-white rounded-full md:top-15 top-10 right-1/2 md:h-25 md:w-25"
        alt="avatar"
      />
      <div className="md:mt-35 mt-30">
        <h2 className="text-lg text-center truncate">{name}</h2>
        <p className="mb-5 text-base font-light text-center truncate md:mb-8">
          {status} {company && <span>at {company}</span>}
        </p>
        
        <Link
          to={`/profile/${_id}`}
          className=" cursor-pointer flex justify-center w-full py-1 md:py-1.5 rounded-full border border-blue-600 active:bg-gray-100"
        >
          View Profile
        </Link>
        {auth.user && _id !== auth.user._id && (
          <button
            className="mt-2.5 cursor-pointer flex items-center justify-center w-full py-1 md:py-1.5 text-white border border-blue-600 bg-blue-600 rounded-full gap-x-2"
            onClick={() => {
              addFollower(_id);
            }}
          >
            Follow <RiUserAddLine />
          </button>
        )}
      </div>
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
