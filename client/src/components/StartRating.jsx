import React from "react";
import { assets } from "../assets/assets";

const StartRating = ({ rating = 4 }) => {
  return (
    <div className="flex items-center gap-1">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <img
            key={index}
            src={
              index < rating ? assets.starIconFilled : assets.starIconOutlined
            }
            alt="star"
            className="w-4 h-4"
          />
        ))}
    </div>
  );
};

export default StartRating;
