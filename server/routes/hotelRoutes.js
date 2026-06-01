import express from "express";
import { registerHotel } from "../controllers/HotelController.js";
import { protect } from "../middleware/authMiddleware.js";

const hotelRouter = express.Router();
hotelRouter.post('/register',protect,registerHotel)

export default hotelRouter;