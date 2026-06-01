import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { roomsDummyData, assets, facilityIcons } from "../assets/assets";
import StartRating from "../components/StartRating";

const RoomDetails = () => {
  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const foundRoom = roomsDummyData.find((room) => room._id.toString() === id);

    if (foundRoom) {
      setRoom(foundRoom);
      setMainImage(foundRoom.images[0]);
    }
  }, [id]);

  if (!room) {
    return <p>Loading room details...</p>;
  }

  return (
    <div className="px-6 md:px-12 lg:px-20 py-8">
      <h1 className="text-3xl font-bold">
        {room.hotel.name}
        <span className="ml-3 text-lg font-normal text-gray-500">
          {room.roomType}
        </span>
      </h1>

      <p className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm mt-3">
        20% OFF
      </p>

      <div className="flex items-center gap-2 mt-3">
        <StartRating />
        <p className="text-gray-500">200+ Reviews</p>
      </div>

      <div className="flex items-center gap-2 mt-2 text-gray-600">
        <img src={assets.locationIcon} alt="Location" className="w-5 h-5" />
        <span>{room.hotel.address}</span>
      </div>

      <div className="mt-6">
        <img
          src={mainImage}
          alt="Main Room"
          className="w-full h-[450px] object-cover rounded-xl"
        />
      </div>

      <div className="flex gap-3 flex-wrap mt-4">
        {room.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Room"
            onClick={() => setMainImage(image)}
            className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 ${
              mainImage === image ? "border-blue-500" : "border-gray-200"
            }`}
          />
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold mb-4">
            Experience Luxury Like Never Before
          </h2>

          <div className="flex flex-wrap gap-4 mb-6">
            {room.amenities.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 border rounded-lg px-4 py-2"
              >
                <img src={facilityIcons[item]} alt={item} className="w-5 h-5" />
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-600 leading-7">
            Enjoy premium comfort and modern amenities designed to make your
            stay unforgettable. Relax in spacious rooms, experience top-class
            hospitality, and create memorable moments during your visit.
          </p>
        </div>

        {/* Booking Card */}
        <div className="border rounded-xl shadow-lg p-6 h-fit">
          <h2 className="text-3xl font-bold mb-6">
            ${room.pricePerNight}
            <span className="text-lg font-normal text-gray-500">/night</span>
          </h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="checkIn" className="block mb-1 font-medium">
                Check-In
              </label>
              <input
                type="date"
                id="checkIn"
                required
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label htmlFor="checkOut" className="block mb-1 font-medium">
                Check-Out
              </label>
              <input
                type="date"
                id="checkOut"
                required
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label htmlFor="guests" className="block mb-1 font-medium">
                Guests
              </label>
              <input
                type="number"
                id="guests"
                min="1"
                max="10"
                defaultValue="1"
                required
                className="w-full border rounded-lg p-2"
              />
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
              Check Availability
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
