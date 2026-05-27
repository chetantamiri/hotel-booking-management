import React from "react";

const Title = ({ title, subtitle }) => {
  return (
    <div className="text-center max-w-4xl mx-auto mb-12 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
        {title}
      </h1>

      <p className="mt-5 text-gray-600 text-base md:text-lg leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
};

export default Title;
