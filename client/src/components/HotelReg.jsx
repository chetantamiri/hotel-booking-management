import React from "react";
import { assets, cities } from "../assets/assets";

const HotelReg = () => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <form className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-5xl relative">
        {/* Close Button */}
        <img
          src={assets.closeIcon}
          alt=""
          className="w-6 h-6 absolute top-4 right-4 cursor-pointer"
        />

        <div className="grid md:grid-cols-2">
          {/* Left Side Image */}
          <img
            src={assets.regImage}
            alt=""
            className="w-full h-full object-cover"
          />

          {/* Right Side Form */}
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-2">Register Your Hotel</h2>

            <p className="text-gray-500 mb-6">
              Fill in the details below to register your hotel.
            </p>

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter hotel name"
                  className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block mb-1 font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Type Here"
                  className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="address" className="block mb-1 font-medium">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  placeholder="Type Here"
                  className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="city" className="block mb-1 font-medium">
                  City
                </label>
                <select
                  id="city"
                  className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select City</option>

                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Register Hotel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HotelReg;
