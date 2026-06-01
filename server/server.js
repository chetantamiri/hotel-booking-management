import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkwebhook from "./controllers/clerkwebhook.js";
connectDB();
const app = express();
app.use(cors()); //Allow connect back to any frontend
app.use(express.json()); //Allow to send json data from frontend to backend
app.use(clerkMiddleware());
app.use("/api/webhook", clerkwebhook);

app.get(`/`, (req, res) => {
  res.send("API is working good");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
