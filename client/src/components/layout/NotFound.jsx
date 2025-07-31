import React from "react";
import LandingPageNavbar from "./LandingPage/LandingPageNavbar";
import Footer from "./LandingPage/Footer";
import { BiSolidErrorCircle } from "react-icons/bi";

function NotFound() {
  return (
    <>
      <LandingPageNavbar />
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <BiSolidErrorCircle className="text-8xl" />

        <h2 className="text-2xl pt-5">Sorry, this page does not exists!</h2>
      </div>
      <Footer />
    </>
  );
}

export default NotFound;
