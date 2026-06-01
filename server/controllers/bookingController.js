import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const createBooking = async (req, res) => {
  try {
    const { roomId, checkInDate, checkOutDate, totalPrice } = req.body;
    const userId = req.user._id;

    const room = await Room.findById(roomId);
    if (!room || !room.isAvailable) {
      return res.json({ success: false, message: "Room is not available" });
    }

    const booking = await Booking.create({
      hotel: room.hotel,
      room: roomId,
      user: userId,
      checkInDate,
      checkOutDate,
      totalPrice,
      isPaid: true, // Auto-setting paid for simplicity right now
      status: "Confirmed",
    });

    res.json({ success: true, message: "Room booked successfully", booking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("hotel")
      .populate("room");
    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getHotelBookings = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.user._id });
    if (!hotel) {
      return res.json({ success: false, message: "Hotel not found" });
    }

    const bookings = await Booking.find({ hotel: hotel._id })
      .populate("user")
      .populate("room");
    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getHotelStats = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.user._id });
    if (!hotel) {
      return res.json({ success: false, message: "Hotel not found" });
    }

    const bookings = await Booking.find({ hotel: hotel._id }).populate("room");
    
    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);

    res.json({
      success: true,
      stats: {
        totalBookings,
        totalRevenue,
      },
      bookings, // returning recent bookings as well
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
