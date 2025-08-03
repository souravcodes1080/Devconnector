import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";
import { Link, useNavigate } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";
import Spinner from "../layout/Spinner";

function AddExperience({ addExperience }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [toDateDisables, toggleDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <div className="lg:w-[60%] sm:w-[80%] sm:max-w-[1920px] w-[90%] relative mx-auto min-h-[100vh] pt-25">
      <h1 className="mb-1 text-xl font-semibold text-blue-600 md:text-3xl ">
        Add An Experience
      </h1>
      <button
        onClick={() => navigate(-1)}
        className="absolute hidden px-4 py-3 transition-all duration-300 bg-white border rounded-lg shadow-sm top-25 hover:bg-gray-50 border-gray-300/10 -left-18 md:block"
      >
        <GoChevronLeft className="text-2xl " />
      </button>
      <p className="mb-5 text-base italic font-light">
        Add any developer/programming positions that you have had in the past
      </p>
      <form
        className="relative"
        onSubmit={async (e) => {
          e.preventDefault();
          setIsSubmitting(true);
          try {
            await addExperience(formData, navigate);
            setIsSubmitting(false);
            // setTimeout(() => setIsSubmitting(false), 2000);
          } catch (err) {
            console.error(err);
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
              className="px-4 py-2 border-2 border-blue-600 outline-none cursor-pointer group rounded-xl"
              placeholder="* Job Title"
              name="title"
              value={title}
              onChange={(e) => onChange(e)}
            />
            <small className="absolute text-blue-600 bg-white text-[14px] -bottom-2 right-7 group-active:-bottom-6 group-hover:-bottom-6 transition-all duration-100 hidden sm:block">
              Job Title
            </small>
          </div>
          <div className="relative flex flex-col group">
            <input
              className="px-4 py-2 border-2 border-blue-600 outline-none group rounded-xl"
              type="text"
              placeholder="* Company"
              name="company"
              value={company}
              onChange={(e) => onChange(e)}
            />
            <small className="absolute text-blue-600 bg-white text-[14px] -bottom-2 right-7 group-active:-bottom-6 group-hover:-bottom-6 transition-all duration-100 hidden sm:block">
              Company
            </small>
          </div>
          <div className="relative flex flex-col group">
            <input
              type="text"
              className="px-4 py-2 border-2 border-blue-600 outline-none group rounded-xl"
              placeholder="Location"
              name="location"
              value={location}
              onChange={(e) => onChange(e)}
            />
            <small className="absolute text-blue-600 bg-white text-[14px] -bottom-2 right-7 group-active:-bottom-6 group-hover:-bottom-6 transition-all duration-100 hidden sm:block">
              Work location / remote
            </small>
          </div>
          <div className="relative flex flex-col group">
            <input
              className="px-4 py-2 border-2 border-blue-600 outline-none cursor-pointer group rounded-xl"
              type="date"
              name="from"
              value={from}
              onChange={(e) => onChange(e)}
            />

            <small className="absolute text-blue-600 bg-white text-[14px] -bottom-2 right-7 group-active:-bottom-6 group-hover:-bottom-6 transition-all duration-100 hidden sm:block">
              From date
            </small>
          </div>
          <div className="form-group">
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
              Current Job
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
              placeholder="Job Description"
              onChange={(e) => onChange(e)}
              value={description}
              className="px-4 py-2 border-2 border-blue-600 outline-none cursor-pointer resize-none group rounded-xl"
            ></textarea>
            <small className="absolute text-blue-600 bg-white text-[14px] -bottom-2 right-7 group-active:-bottom-6 group-hover:-bottom-6 transition-all duration-100 hidden sm:block">
              Job description
            </small>
          </div>
        </div>
        <input
          value={"Add Experience"}
          type="submit"
          className="flex justify-end w-auto px-4 py-2 m-auto my-1 mb-4 text-right text-white bg-blue-600 cursor-pointer rounded-xl"
        />
      </form>
    </div>
  );
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
