import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    // ✅ image is NOT required — some Clerk users have no profile photo
    image: { type: String, default: "" },
    role: {
      type: String,
      enum: ["hotelOwner", "user"],
      default: "user",
    },
    recentSearchedCities: [{ type: String }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;