import React, { useState, useEffect } from "react";
import { assets, cities } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const HotelReg = ({ onClose }) => {
  const { backendUrl, getToken } = useAppContext();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      const { data } = await axios.post(`${backendUrl}/api/hotelregister/register`, {
        name: formData.name,
        contact: formData.phone,
        address: formData.address,
        city: formData.city
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.success) {
        toast.success(data.message || "Hotel registered successfully!");
        if (onClose) onClose();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to register hotel");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-5xl relative">
        {/* Close Button */}
        <img
          src={assets.closeIcon}
          alt=""
          onClick={onClose}
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
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter hotel name"
                  className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block mb-1 font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Type Here"
                  className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block mb-1 font-medium">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Type Here"
                  className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="city" className="block mb-1 font-medium">
                  City
                </label>
                <select
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                  required
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
