import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";
import { Link, useNavigate } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";
import Spinner from "../layout/Spinner";

function AddEducation({ addEducation }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [toDateDisables, toggleDisabled] = useState(false);

  const { school, degree, fieldOfStudy, from, to, current, description } =
    formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <div className="lg:w-[60%] sm:w-[80%] sm:max-w-[1920px] w-[90%] relative mx-auto min-h-[100vh] pt-25">
      <h1 className="mb-1 text-xl font-semibold text-blue-600 md:text-3xl ">
        Add An Education
      </h1>
      <button
        onClick={() => navigate(-1)}
        className="absolute hidden px-4 py-3 transition-all duration-300 bg-white border rounded-lg shadow-sm top-25 hover:bg-gray-50 border-gray-300/10 -left-18 md:block"
      >
        <GoChevronLeft className="text-2xl " />
      </button>
      <p className="mb-5 text-base italic font-light">
        Add any school or bootcamp that you have attended
      </p>

      <form
        className="relative"
        onSubmit={async (e) => {
          e.preventDefault();
          setIsSubmitting(true);
          try {
            await addEducation(formData, navigate);
            setIsSubmitting(false);
          } catch (error) {
            console.log(error);
            setIsSubmitting(false);
          }
        }}
      >
        {isSubmitting && (
          <div className="absolute inset-0 flex items-center justify-center w-full h-full z-5 bg-white/80">
            <Spinner />
          </div>
        )}

        <div className="flex flex-col w-full my-7 gap-y-7">
          <div className="relative flex flex-col group">
            <input
              type="text"
              placeholder="* School"
              className="px-4 py-2 border-2 border-blue-600 outline-none cursor-pointer group rounded-xl"
              name="school"
              value={school}
              onChange={(e) => onChange(e)}
            />
            <small className="absolute text-blue-600 bg-white text-[14px] -bottom-2 right-7 group-active:-bottom-6 group-hover:-bottom-6 transition-all duration-100 hidden sm:block">
              Add school or any course
            </small>
          </div>
          <div className="relative flex flex-col group">
            <input
              type="text"
              placeholder="* Degree or Certificate"
              className="px-4 py-2 border-2 border-blue-600 outline-none cursor-pointer group rounded-xl"
              name="degree"
              value={degree}
              onChange={(e) => onChange(e)}
            />
            <small className="absolute text-blue-600 bg-white text-[14px] -bottom-2 right-7 group-active:-bottom-6 group-hover:-bottom-6 transition-all duration-100 hidden sm:block">
              Add a degree or certificate
            </small>
          </div>
          <div className="relative flex flex-col group">
            <input
              className="px-4 py-2 border-2 border-blue-600 outline-none cursor-pointer group rounded-xl"
              type="text"
              placeholder="Field Of Study"
              name="fieldOfStudy"
              value={fieldOfStudy}
              onChange={(e) => onChange(e)}
            />
            <small className="absolute text-blue-600 bg-white text-[14px] -bottom-2 right-7 group-active:-bottom-6 group-hover:-bottom-6 transition-all duration-100 hidden sm:block">
              Add your branch or specialization
            </small>
          </div>

          <div className="relative flex flex-col group">
            <input
              type="date"
              name="from"
              value={from}
              className="px-4 py-2 border-2 border-blue-600 outline-none cursor-pointer group rounded-xl"
              onChange={(e) => onChange(e)}
            />
            <small className="absolute text-blue-600 bg-white text-[14px] -bottom-2 right-7 group-active:-bottom-6 group-hover:-bottom-6 transition-all duration-100 hidden sm:block">
              From date
            </small>
          </div>
          <div className="relative flex flex-col group">
            <p>
              <input
                type="checkbox"
                name="current"
                value={current}
                checked={current}
                onChange={(e) => {
                  setFormData({ ...formData, current: !current });
                  toggleDisabled(!toDateDisables);
                }}
              />{" "}
              Current School / Program
            </p>
          </div>
          <div className="relative flex flex-col group">
            <input
              type="date"
              name="to"
              value={to}
              onChange={(e) => onChange(e)}
              disabled={toDateDisables ? "disabled" : ""}
              className={`px-4 py-2 ${
                current ? "opacity-30 cursor-not-allowed" : "cursor-pointer "
              } border-2 border-blue-600 outline-none group rounded-xl`}
            />
            {!current && (
              <small className="absolute text-blue-600 bg-white text-[14px] -bottom-2 right-7 group-active:-bottom-6 group-hover:-bottom-6 transition-all duration-100 hidden sm:block">
                To date
              </small>
            )}
          </div>
          <div className="relative flex flex-col group">
            <textarea
              name="description"
              rows="3"
              placeholder="Program Description"
              onChange={(e) => onChange(e)}
              value={description}
              className="px-4 py-2 border-2 border-blue-600 outline-none cursor-pointer resize-none group rounded-xl"
            ></textarea>
            <small className="absolute text-blue-600 bg-white text-[14px] -bottom-2 right-7 group-active:-bottom-6 group-hover:-bottom-6 transition-all duration-100 hidden sm:block">
              Provide some course description
            </small>
          </div>
        </div>
        <input
          value={"Add Education"}
          type="submit"
          className="flex justify-end w-auto px-4 py-2 m-auto my-1 mb-4 text-right text-white bg-blue-600 cursor-pointer rounded-xl"
        />
      </form>
    </div>
  );
}

AddEducation.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
