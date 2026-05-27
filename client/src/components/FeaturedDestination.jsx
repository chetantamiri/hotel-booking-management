import React from "react";
import { roomsDummyData } from "../assets/assets";
import HotelCard from "./HotelCard";
import Title from "./Title";
import { useNavigate } from "react-router-dom";

const FeaturedDestination = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Title
        title="Featured Destination"
        subtitle="Explore our handpicked selection of top-rated hotels in popular destinations around the world. Whether you're seeking a beachfront resort, a cozy boutique hotel, or a luxurious urban retreat, our featured destinations offer something for every traveler. Discover the best places to stay and make your next trip unforgettable with our curated list of exceptional accommodations."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8 py-8">
        {roomsDummyData.slice(0, 4).map((room, index) => (
          <HotelCard key={room._id} index={index} rooms={room} />
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/rooms");
          scrollTo(0, 0);
        }}
        className="flex items-center justify-center border-1 rounded-full px-6 py-3 mx-auto mt-8 text-sm font-semibold text-gray-800 border-gray-300 hover:bg-gray-100 transition-colors duration-300"
      >
        View all Destinations
      </button>
    </div>
  );
};

export default FeaturedDestination;
