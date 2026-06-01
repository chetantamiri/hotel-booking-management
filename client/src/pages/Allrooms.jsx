import React, { useState } from "react";
import { roomsDummyData, assets, facilityIcons } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import StartRating from "../components/StartRating";

const Allrooms = () => {
  const navigate = useNavigate();
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("All");

  const handleTypeChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((item) => item !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const filteredRooms = roomsDummyData.filter((room) => {
    const typeMatch =
      selectedTypes.length === 0 || selectedTypes.includes(room.roomType);
    const priceMatch =
      selectedPrice === "All"
        ? true
        : selectedPrice === "0-100"
          ? room.pricePerNight <= 100
          : selectedPrice === "100-200"
            ? room.pricePerNight > 100 && room.pricePerNight <= 200
            : room.pricePerNight > 200;
    return typeMatch && priceMatch;
  });

  const roomTypes = ["Single Bed", "Double Bed", "Luxury Room"];
  const priceRanges = [
    { label: "All Prices", value: "All" },
    { label: "$0 – $100", value: "0-100" },
    { label: "$100 – $200", value: "100-200" },
    { label: "$200+", value: "200+" },
  ];

  return (
    <div
      className="min-h-screen px-6 py-10 md:px-12"
      style={{ background: "#faf8f5", fontFamily: "'Georgia', serif" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* LEFT — Room Listings */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-10 border-b border-stone-200 pb-6">
            <p className="text-xs uppercase tracking-[0.25em] text-amber-600 font-sans mb-2">
              Browse Collection
            </p>
            <h1
              className="text-5xl font-normal text-stone-800 leading-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              All Rooms
            </h1>
            <p className="text-stone-500 mt-3 font-sans text-sm leading-relaxed">
              Handpicked accommodations for a stay worth remembering.
            </p>
          </div>

          {/* Results count */}
          <p className="text-xs font-sans uppercase tracking-widest text-stone-400 mb-6">
            {filteredRooms.length}{" "}
            {filteredRooms.length === 1 ? "room" : "rooms"} available
          </p>

          {/* Room Cards */}
          <div className="flex flex-col gap-6">
            {filteredRooms.map((room, i) => (
              <div
                key={room._id}
                onClick={() => navigate(`/AllRooms/${room._id}`)}
                className="group flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
                style={{
                  boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
                  animationDelay: `${i * 60}ms`,
                }}
              >
                {/* Image */}
                <div className="sm:w-72 sm:shrink-0 overflow-hidden">
                  <img
                    src={room.images[0]}
                    alt={room.hotel.name}
                    className="w-full h-56 sm:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between p-6 flex-1">
                  <div>
                    {/* City badge */}
                    <span className="inline-block text-[10px] uppercase tracking-[0.2em] font-sans bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full mb-3">
                      {room.hotel.city}
                    </span>

                    {/* Name */}
                    <h2
                      className="text-2xl text-stone-800 font-normal leading-snug mb-2 group-hover:text-amber-700 transition-colors"
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      {room.hotel.name}
                    </h2>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <StartRating />
                      <span className="text-stone-400 font-sans text-xs">
                        200+ Reviews
                      </span>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-2 mb-4">
                      <img
                        src={assets.locationIcon}
                        alt="location"
                        className="w-3.5 h-3.5 mt-0.5 opacity-50"
                      />
                      <span className="text-stone-500 font-sans text-xs leading-relaxed">
                        {room.hotel.address}
                      </span>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-full"
                        >
                          <img
                            src={facilityIcons[item]}
                            alt={item}
                            className="w-3 h-3 opacity-60"
                          />
                          <p className="text-[11px] font-sans text-stone-500 tracking-wide">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-end justify-between mt-5 pt-4 border-t border-stone-100">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-sans text-stone-400 mb-0.5">
                        From
                      </p>
                      <p
                        className="text-2xl text-stone-800"
                        style={{ fontFamily: "'Georgia', serif" }}
                      >
                        ${room.pricePerNight}
                        <span className="text-sm text-stone-400 font-sans ml-1">
                          / night
                        </span>
                      </p>
                    </div>
                    <span className="text-xs font-sans uppercase tracking-widest text-amber-600 border border-amber-300 px-4 py-2 rounded-full group-hover:bg-amber-600 group-hover:text-white transition-all duration-200">
                      View Room →
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {filteredRooms.length === 0 && (
              <div className="text-center py-20 text-stone-400 font-sans text-sm">
                No rooms match your selected filters.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — Filters */}
        <aside className="lg:w-72 shrink-0">
          <div
            className="bg-white rounded-2xl p-7 sticky top-8"
            style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}
          >
            <div className="border-b border-stone-100 pb-5 mb-6">
              <p className="text-[10px] uppercase tracking-[0.25em] font-sans text-amber-600 mb-1">
                Refine
              </p>
              <h2
                className="text-2xl font-normal text-stone-800"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Filters
              </h2>
            </div>

            {/* Room Type */}
            <div className="mb-7">
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-sans text-stone-400 mb-4">
                Room Type
              </h3>
              <div className="flex flex-col gap-3">
                {roomTypes.map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div className="relative w-4 h-4 shrink-0">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleTypeChange(type)}
                        className="peer absolute opacity-0 w-4 h-4 cursor-pointer"
                      />
                      <div className="w-4 h-4 border border-stone-300 rounded peer-checked:bg-amber-600 peer-checked:border-amber-600 transition-all flex items-center justify-center">
                        {selectedTypes.includes(type) && (
                          <svg
                            className="w-2.5 h-2.5 text-white"
                            fill="none"
                            viewBox="0 0 12 12"
                          >
                            <path
                              d="M2 6l3 3 5-5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="font-sans text-sm text-stone-600 group-hover:text-stone-900 transition-colors">
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-stone-100 mb-7" />

            {/* Price Range */}
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-sans text-stone-400 mb-4">
                Price Range
              </h3>
              <div className="flex flex-col gap-3">
                {priceRanges.map(({ label, value }) => (
                  <label
                    key={value}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div className="relative w-4 h-4 shrink-0">
                      <input
                        type="radio"
                        name="price"
                        checked={selectedPrice === value}
                        onChange={() => setSelectedPrice(value)}
                        className="peer absolute opacity-0 w-4 h-4 cursor-pointer"
                      />
                      <div className="w-4 h-4 border border-stone-300 rounded-full peer-checked:border-amber-600 transition-all flex items-center justify-center">
                        {selectedPrice === value && (
                          <div className="w-2 h-2 rounded-full bg-amber-600" />
                        )}
                      </div>
                    </div>
                    <span className="font-sans text-sm text-stone-600 group-hover:text-stone-900 transition-colors">
                      {label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Reset */}
            {(selectedTypes.length > 0 || selectedPrice !== "All") && (
              <button
                onClick={() => {
                  setSelectedTypes([]);
                  setSelectedPrice("All");
                }}
                className="mt-7 w-full text-xs font-sans uppercase tracking-widest text-stone-400 hover:text-amber-600 transition-colors py-2 border border-stone-200 rounded-full hover:border-amber-300"
              >
                Clear Filters
              </button>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Allrooms;
