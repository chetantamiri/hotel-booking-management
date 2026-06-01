import React from "react";
import Title from "../components/Title";
import { userBookingsDummyData, assets } from "../assets/assets";

const MyBooking = () => {
  return (
    <div className="px-6 md:px-12 lg:px-20 py-10">
      <Title
        title="My Bookings"
        subtitle="Easily manage your past and upcoming hotel bookings"
      />

      <div className="hidden md:grid grid-cols-3 font-semibold text-gray-600 border-b pb-4 mt-8">
        <div>Hotels</div>
        <div>Date & Time</div>
        <div>Payment</div>
      </div>

      {userBookingsDummyData.map((booking) => (
        <div
          key={booking._id}
          className="grid md:grid-cols-3 gap-6 border-b py-6"
        >
          {/* Hotel Info */}
          <div className="flex gap-4">
            <img
              src={booking.room.images[0]}
              alt=""
              className="w-32 h-32 object-cover rounded-lg"
            />

            <div>
              <p className="text-xl font-semibold">{booking.hotel.name}</p>

              <p className="text-gray-500">{booking.room.roomType}</p>

              <div className="flex items-center gap-2 mt-2">
                <img src={assets.locationIcon} alt="" className="w-4 h-4" />
                <p className="text-sm text-gray-600">{booking.hotel.address}</p>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <img src={assets.guestsIcon} alt="" className="w-4 h-4" />
                <p className="text-sm text-gray-600">{booking.guests} Guests</p>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="space-y-3">
            <div>
              <p className="font-medium">Check In</p>
              <p className="text-gray-600">
                {new Date(booking.checkInDate).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="font-medium">Check Out</p>
              <p className="text-gray-600">
                {new Date(booking.checkOutDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Payment */}
          <div className="flex flex-col justify-center gap-3">
            <span
              className={`w-fit px-3 py-1 rounded-full text-sm ${
                booking.isPaid
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {booking.isPaid ? "Paid" : "Pending"}
            </span>

            {!booking.isPaid && (
              <button className="w-fit bg-blue-700 text-white px-2 py-1 rounded-xl hover:bg-blue-500 transition">
                Pay Now
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBooking;
