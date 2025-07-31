import React from "react";
import { HiPaperAirplane } from "react-icons/hi2";

function NewsLetter() {
  return (
    <section>
      <div className="sm:w-[80%] sm:max-w-[1920px] w-[90%] mx-auto flex justify-center flex-col items-center pt-24">
        <h4 className="md:text-4xl text-2xl font-semibold">Subscribe to our newsletter.</h4>
        <p className="sm:w-[55%] w-full text-center sm:text-lg text-base text-gray-600 pt-3 pb-10">
          Get the latest dev tips, product updates, and community news delivered
          straight to your inbox — no spam
        </p>
        <div className="flex items-center rounded-full overflow-hidden">
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-gray-100 sm:px-8 px-4 sm:py-4 py-3 md:w-77 w-45 outline-none"
          />
          <button className="bg-black text-white flex items-center gap-x-3 sm:px-8 px-4 sm:py-4 py-3 cursor-pointer transition-all duration-300 hover:bg-gray-700">
            Subscribe <HiPaperAirplane />
          </button>
        </div>
      </div>
      <img src="/images/footer_.png" alt="footer-img" loading="lazy" className="w-screen md:h-170  h-100 object-cover" />
    </section>
  );
}

export default NewsLetter;
