import express from "express";
import {
  createBooking,
  getUserBookings,
  getHotelBookings,
  getHotelStats,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const bookingRouter = express.Router();

bookingRouter.post("/create", protect, createBooking);
bookingRouter.get("/user", protect, getUserBookings);
bookingRouter.get("/hotel", protect, getHotelBookings);
bookingRouter.get("/hotel-stats", protect, getHotelStats);

export default bookingRouter;
