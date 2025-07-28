import axios from "axios";
import { setAlert } from "./alert";
import { BASE_API_URL } from "../../API_CONFIG";

import { ACCOUNT_DELETED, CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from "./types";

//Get current user profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_API_URL}/api/profile/me`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Create/Update profile
export const createProfile =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post(
        `${BASE_API_URL}/api/profile`,
        formData,
        config
      );
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "primary"),
        navigate("/dashboard")
      );
      if (!edit) {
        navigate("/dashboard");
      }
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };

//Add Experience
export const addExperience = (formData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(
      `${BASE_API_URL}/api/profile/experience`,
      formData,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience added.", "primary"), navigate("/dashboard"));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Add Education
export const addEducation = (formData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(
      `${BASE_API_URL}/api/profile/education`,
      formData,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education added.", "primary"), navigate("/dashboard"));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Delete Experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${BASE_API_URL}/api/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience Deleted", "danger"));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
//Delete Education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${BASE_API_URL}/api/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education Deleted", "danger"));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Delete Profile
export const deleteAccount = (navigate) => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure to delete your account? This can NOT be undone!"
    )
  ) {
    try {
      const res = await axios.delete(`${BASE_API_URL}/api/profile`);
      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: ACCOUNT_DELETED,
      });
      dispatch(setAlert("Your account has been permanently deleted.", "success"), navigate("/"));
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  }
};
