import React from "react";
import Title from "./Title";
import { assets, exclusiveOffers } from "../assets/assets";

const ExclusiveOffers = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <Title
          align="left"
          title="Exclusive Offers"
          subtitle="Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories."
        />

        <button className="flex items-center gap-2 border-2 border-black px-5 py-2.5 rounded-full hover:bg-black hover:text-white transition-all duration-300 w-fit">
          View all offers
          <img src={assets.arrowIcon} alt="" className="w-4 h-4" />
        </button>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {exclusiveOffers.map((item) => (
          <div
            key={item._id}
            style={{ backgroundImage: `url(${item.image})` }}
            className="h-80 bg-cover bg-center rounded-3xl overflow-hidden relative group"
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
              <p className="bg-white text-black text-sm font-semibold px-4 py-1 rounded-full w-fit mb-4">
                {item.priceOff}% OFF
              </p>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold">{item.title}</h3>

                <p className="text-sm text-gray-200">{item.description}</p>

                <p className="text-sm text-gray-300">
                  Expires: {item.expiryDate}
                </p>
              </div>

              <button className="mt-5 flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl w-fit font-medium hover:scale-105 transition-all duration-300">
                View Offer
                <img src={assets.arrowIcon} alt="" className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveOffers;
