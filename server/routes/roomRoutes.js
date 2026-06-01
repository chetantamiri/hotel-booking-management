import express from "express";
import {
  createRoom,
  getRoom,
  getRooms,
  getOwnerRooms,
  toggleRoomAvailability,
} from "../controllers/roomController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multer.js";

const roomRouter = express.Router();

roomRouter.post("/create", protect, upload.array("images", 4), createRoom);
roomRouter.get("/all", getRooms);
roomRouter.get("/single/:id", getRoom);
roomRouter.get("/owner-rooms", protect, getOwnerRooms);
roomRouter.post("/toggle-availability", protect, toggleRoomAvailability);

export default roomRouter;
