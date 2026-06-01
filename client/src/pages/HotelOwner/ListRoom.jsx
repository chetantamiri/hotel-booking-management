import React, { useState } from "react";
import { roomsDummyData, facilityIcons } from "../../assets/assets";

const ListRoom = () => {
  const [rooms, setRooms] = useState(structuredClone(roomsDummyData));

  const toggleAvailability = (id) => {
    setRooms((prev) =>
      prev.map((room) =>
        room._id === id ? { ...room, isAvailable: !room.isAvailable } : room
      )
    );
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">List Rooms</h1>
        <p className="mt-1 text-gray-500 text-sm">
          Manage all your hotel rooms
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Room</th>
              <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Facilities</th>
              <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Price/Night</th>
              <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
              <th className="text-right px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rooms.map((room) => (
              <tr key={room._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={room.images[0]}
                      alt={room.roomType}
                      className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{room.roomType}</p>
                      <p className="text-xs text-gray-400">{room.hotel.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1.5">
                    {room.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-50 border border-gray-200 rounded-md text-xs text-gray-600"
                      >
                        {facilityIcons[amenity] && (
                          <img src={facilityIcons[amenity]} alt="" className="w-3.5 h-3.5" />
                        )}
                        {amenity}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-gray-900">${room.pricePerNight}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    room.isAvailable
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  }`}>
                    {room.isAvailable ? "Available" : "Booked"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => toggleAvailability(room._id)}
                    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                      room.isAvailable ? "bg-emerald-500" : "bg-gray-300"
                    }`}
                    role="switch"
                    aria-checked={room.isAvailable}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ${
                        room.isAvailable ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListRoom;
