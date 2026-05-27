import React from "react";
import Title from "./Title";
import StartRating from "./StartRating";
import { testimonials } from "../assets/assets";

const Testimonials = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 py-16 bg-gray-50">
      <Title
        title="What Our Guests Say"
        subtitle="Discover why discerning travelers consistently choose QuickStay for their exclusive and luxurious accommodations around the world."
      />

      <div className="flex flex-wrap items-center justify-center gap-8 mt-16">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 max-w-sm w-full"
          >
            {/* User Info */}
            <div className="flex items-center gap-4">
              <img
                className="w-14 h-14 rounded-full object-cover"
                src={testimonial.image}
                alt={testimonial.name}
              />

              <div>
                <p className="text-xl font-semibold text-gray-900">
                  {testimonial.name}
                </p>

                <p className="text-gray-500 text-sm">{testimonial.location}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="mt-5">
              <StartRating />
            </div>

            {/* Review */}
            <p className="text-gray-600 leading-relaxed mt-5 text-sm md:text-base">
              "{testimonial.review}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
