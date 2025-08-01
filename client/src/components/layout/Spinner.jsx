import React from "react";
import spinner from "../../img/spinner.gif";
function Spinner() {
  return (
    <div className="flex items-center justify-center h-full ">
      <img
        src={spinner}
        className="w-10 h-10"
        alt="loading..."
      />
    </div>
  );
}

export default Spinner;
