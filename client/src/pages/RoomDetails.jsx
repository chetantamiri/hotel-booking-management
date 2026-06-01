import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { assets, facilityIcons } from "../assets/assets";
import StartRating from "../components/StartRating";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { backendUrl, getToken, user } = useAppContext();

  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const fetchRoom = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/room/single/${id}`);
      if (data.success) {
        setRoom(data.room);
        setMainImage(data.room.images?.[0] || 'https://via.placeholder.com/600');
      } else {
        toast.error("Failed to load room details");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, [id]);

  const handleBookRoom = async () => {
    if (!user) {
      toast.error("Please login to book a room");
      return;
    }
    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    const checkInTime = new Date(checkIn).getTime();
    const checkOutTime = new Date(checkOut).getTime();
    if (checkOutTime <= checkInTime) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    const diffDays = Math.ceil((checkOutTime - checkInTime) / (1000 * 60 * 60 * 24));
    const totalPrice = diffDays * room.pricePerNight;

    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/booking/create`,
        {
          roomId: room._id,
          checkInDate: checkIn,
          checkOutDate: checkOut,
          totalPrice
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (data.success) {
        toast.success("Room booked successfully!");
        navigate("/my-bookings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while booking the room");
    }
  };

  if (!room) {
    return <div className="text-center py-20 text-gray-500">Loading room details...</div>;
  }

  return (
    <div className="px-6 md:px-12 lg:px-20 py-8">
      <h1 className="text-3xl font-bold">
        {room.hotel?.name || "Hotel"}
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
        <span>{room.hotel?.address || "Address"}</span>
      </div>

      <div className="mt-6">
        <img
          src={mainImage}
          alt="Main Room"
          className="w-full h-[450px] object-cover rounded-xl"
        />
      </div>

      <div className="flex gap-3 flex-wrap mt-4">
        {room.images?.map((image, index) => (
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
            {room.amenities?.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 border rounded-lg px-4 py-2"
              >
                <img src={facilityIcons[item] || assets.checkIcon} alt={item} className="w-5 h-5" />
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
        <div className="border rounded-xl shadow-lg p-6 h-fit bg-white">
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
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
                min={new Date().toISOString().split("T")[0]}
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
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
                min={checkIn || new Date().toISOString().split("T")[0]}
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
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                required
                className="w-full border rounded-lg p-2"
              />
            </div>

            <button 
              type="button" 
              onClick={handleBookRoom}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Book Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
