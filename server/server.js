import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhook from "./controllers/clerkwebhook.js";
import userRouter from "./routes/userRouted.js";
import hotelRouter from "./routes/hotelRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

// Connect to MongoDB
connectDB();

const app = express();

// Allow requests from any frontend
app.use(cors());

// ✅ IMPORTANT: Webhook route MUST be registered BEFORE express.json()
// express.raw() preserves req.body as a raw Buffer — required for svix signature verification
// If express.json() runs first, it parses the body and destroys the raw Buffer → verification fails
app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  clerkWebhook
);

// ✅ JSON parser for all other routes (registered AFTER webhook)
app.use(express.json());

// ✅ Clerk auth middleware
app.use(clerkMiddleware());

// Health check
app.get("/", (req, res) => {
  res.send("API is working good");
});

app.use('/api/user',userRouter);
app.use('/api/hotelregister',hotelRouter);
app.use('/api/room', roomRouter);
app.use('/api/booking', bookingRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});