import React from "react";
import spinner from "../../img/spinner.gif";
function Spinner() {
  return (
    <div className="h-[80vh] flex items-center justify-center">
      <img
        src={spinner}
        className="w-10 h-10"
        alt="loading..."
      />
    </div>
  );
}

export default Spinner;
