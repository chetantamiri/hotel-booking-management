import React, { useState } from "react";
import { assets } from "../../assets/assets";

const roomTypeOptions = ["Single Bed", "Double Bed", "Suite", "Deluxe"];

const Addrooms = () => {
  const [image, setImage] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [input, setInput] = useState({
    roomType: "",
    pricePerNight: "",
    amenities: {
      FreeWiFi: false,
      RoomServices: false,
      FreeBreakfast: false,
      MountainView: false,
      PoolAccess: false,
    },
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenity = (amenity) => {
    setInput((prev) => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: !prev.amenities[amenity],
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitted:", { input, image });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Add Room</h1>
        <p className="mt-1 text-gray-500 text-sm">
          Add a new room to your hotel inventory
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Room Images</p>
            <div className="flex gap-4 flex-wrap">
              {Object.keys(image).map((key) => (
                <label
                  htmlFor={`roomImage${key}`}
                  key={key}
                  className="cursor-pointer group"
                >
                  <img
                    src={
                      image[key] ? URL.createObjectURL(image[key]) : assets.uploadArea
                    }
                    alt={`Room ${key}`}
                    className="w-28 h-28 object-cover border border-gray-200 rounded-lg group-hover:border-primary transition-colors"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    id={`roomImage${key}`}
                    hidden
                    onChange={(e) =>
                      setImage({
                        ...image,
                        [key]: e.target.files[0],
                      })
                    }
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Room Type
              </label>
              <select
                name="roomType"
                value={input.roomType}
                onChange={handleInput}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              >
                <option value="">Select room type</option>
                {roomTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Price Per Night ($)
              </label>
              <input
                type="number"
                name="pricePerNight"
                value={input.pricePerNight}
                onChange={handleInput}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Amenities</p>
            <div className="flex flex-wrap gap-3">
              {Object.keys(input.amenities).map((amenity) => (
                <button
                  type="button"
                  key={amenity}
                  onClick={() => handleAmenity(amenity)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                    input.amenities[amenity]
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {amenity.replace(/([A-Z])/g, " $1").trim()}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200 hover:shadow-md active:scale-95"
            >
              Add Room
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Addrooms;
