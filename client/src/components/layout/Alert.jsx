import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FaBell } from "react-icons/fa";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 && (
    <div className="fixed left-1/2 transform -translate-x-1/2 z-50 md:bottom-10 bottom-2 flex flex-col gap-y-2 items-center w-full px-2">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="flex items-center text-base gap-x-3 rounded-xl px-6 py-3 shadow-lg bg-white md:w-auto w-full max-w-[95%]"
        >
          <FaBell /> {alert.msg}
        </div>
      ))}
    </div>
  );

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
