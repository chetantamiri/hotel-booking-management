import React from "react";
import { assets } from "../assets/assets";

const NewsLetter = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16">
      <div className="flex flex-col items-center w-full max-w-5xl rounded-3xl px-6 py-14 md:py-16 mx-auto my-24 bg-gray-900 text-white shadow-xl">
        {/* Heading */}
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Stay Inspired</h1>

          <p className="text-sm md:text-base text-gray-400 mt-4 max-w-2xl leading-relaxed">
            Join our newsletter and be the first to discover new updates,
            exclusive offers, and inspiration.
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8 w-full max-w-2xl">
          <input
            type="email"
            className="bg-white/10 text-white placeholder-gray-400 px-5 py-3 border border-white/20 rounded-xl outline-none w-full focus:border-white transition-all duration-300"
            placeholder="Enter your email"
          />

          <button className="flex items-center justify-center gap-2 group bg-white text-black px-6 md:px-8 py-3 rounded-xl font-medium hover:scale-105 active:scale-95 transition-all duration-300">
            Subscribe
            <img
              src={assets.arrowIcon}
              alt=""
              className="w-4 h-4 group-hover:translate-x-1 transition-all duration-300"
            />
          </button>
        </div>

        {/* Footer Text */}
        <p className="text-gray-500 mt-6 text-xs text-center max-w-lg leading-relaxed">
          By subscribing, you agree to our Privacy Policy and consent to receive
          updates.
        </p>
      </div>
    </div>
  );
};

export default NewsLetter;
