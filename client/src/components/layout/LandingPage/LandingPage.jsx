import React from "react";
import LandingPageNavbar from "./LandingPageNavbar";
import Hero from "./Hero";
import Section1 from "./Section1";
import Section2 from "./Section2";
import NewsLetter from "./NewsLetter";
import Footer from "./Footer";

function LandingPage() {
  return (
    <>
      <Hero />
      <Section1 />
      <Section2 />
      <NewsLetter />
    </>
  );
}

export default LandingPage;
