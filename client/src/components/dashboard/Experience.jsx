import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dayjs from "dayjs";
import {deleteExperience} from "../../actions/profile"
function Experience({ experience, deleteExperience }) {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        {dayjs(exp.from).format("YYYY/MM/DD")} -{" "}
        {exp.to ? dayjs(exp.to).format("YYYY/MM/DD") : "Now"}
      </td>
      <td>
        <button className="btn btn-danger" onClick={()=> deleteExperience(exp._id)}><i className="fas fa-trash"></i>
          <span className="hide-sm"> Delete</span>
        </button>
      </td>
    </tr>
  ));
  return (
    <div>
      <h1 className="my-2">Experience Credentials</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th className="hide-sm">Action</th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </div>
  );
}

Experience.propTypes = {
  experiences: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, {deleteExperience})(Experience);
