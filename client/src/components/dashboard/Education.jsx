import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { deleteEducation } from "../../actions/profile";
function Education({ education, deleteEducation }) {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        {dayjs(edu.from).format("YYYY/MM/DD")} -{" "}
        {edu.to ? dayjs(edu.to).format("YYYY/MM/DD") : "Now"}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteEducation(edu._id)}
        >
          <i className="fas fa-trash"></i>
          <span className="hide-sm"> Delete</span>
        </button>
      </td>
    </tr>
  ));
  return (
    <div>
      <h1 className="my-2">Education Credentials</h1>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th className="hide-sm">Action</th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </div>
  );
}

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
