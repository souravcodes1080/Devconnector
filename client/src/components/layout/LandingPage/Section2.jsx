import React from "react";

function Section2() {
  return (
    <section className="sm:w-[80%] sm:max-w-[1920px] w-[90%] mx-auto py-10">
      <div className="flex items-center justify-between my-10 gap-x-15 md:flex-nowrap flex-wrap md:flex-row flex-col-reverse">
        <img src="/images/figure1.svg" alt="" className="flex-1/3 md:w-full " />
        <div className="flex-2/3 pl-5">
          <h4 className="sm:text-4xl text-2xl">
            Built something cool? Show it off. We got you.
          </h4>
          <p className="sm:text-xl text-lg font-light lg:w-[70%] w-[100%] py-5">
            Struggling with a bug that;s frying your brain? You are not alone — the community's got your back.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between sm:my-10 my-15 gap-x-15 md:flex-nowrap flex-wrap md:flex-row flex-col">
        <div className="flex-2/3 pl-5">
          <h4 className="sm:text-4xl text-2xl">
            Connect is your launchpad.  
          </h4>
          <p className="sm:text-xl text-lg font-light lg:w-[70%] w-[100%] py-5">
            From side projects to serious builds — Ask questions, share wins, and vibe with developers who speak your language.
          </p>
        </div>
        <img src="/images/figure2.svg" alt="" className="flex-1/3 md:w-full " />
      </div>
     
    </section>
  );
}

export default Section2;
