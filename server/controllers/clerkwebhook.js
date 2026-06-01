import User from "../models/user.js";
import { Webhook } from "svix";

const clerkWebhook = async (req, res) => {
  try {
    // Ensure webhook secret is loaded
    const secret = process.env.CLERK_WEBHOOK_SECRET;
    if (!secret) {
      console.error("❌ CLERK_WEBHOOK_SECRET is not set");
      return res.status(500).json({ success: false, message: "Webhook secret not configured" });
    }

    // Create Svix webhook instance
    const whook = new Webhook(secret);

    // Get Svix headers
    const svixId = req.headers["svix-id"];
    const svixTimestamp = req.headers["svix-timestamp"];
    const svixSignature = req.headers["svix-signature"];

    // Log headers for debugging
    console.log("Svix Headers:", { svixId, svixTimestamp, svixSignature });

    if (!svixId || !svixTimestamp || !svixSignature) {
      console.error("❌ Missing svix headers");
      return res.status(400).json({ success: false, message: "Missing svix headers" });
    }

    const headers = {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    };

    // req.body must be the raw Buffer (from express.raw middleware)
    let payload;
    try {
      payload = whook.verify(req.body, headers);
    } catch (verifyError) {
      console.error("❌ Svix verification failed:", verifyError.message);
      return res.status(400).json({ success: false, message: "Webhook verification failed" });
    }

    const { data, type } = payload;
    console.log(`✅ Webhook verified. Type: ${type}`);
    console.log("Data received:", JSON.stringify(data, null, 2));

    // Build user data — handle missing fields safely
    const userData = {
      _id: data.id,
      name: `${data.first_name || ""} ${data.last_name || ""}`.trim() || "New User",
      email: data.email_addresses?.[0]?.email_address || "",
      image: data.image_url || "https://ui-avatars.com/api/?name=User",
    };

    console.log("userData to save:", userData);

    switch (type) {
      case "user.created": {
        const newUser = await User.create(userData);
        console.log("✅ User created in DB:", newUser._id);
        break;
      }

      case "user.updated": {
        const updatedUser = await User.findByIdAndUpdate(data.id, userData, { new: true });
        console.log("✅ User updated in DB:", updatedUser?._id);
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        console.log("✅ User deleted from DB:", data.id);
        break;
      }

      default:
        console.log(`⚠️ Unhandled event type: ${type}`);
    }

    return res.status(200).json({
      success: true,
      message: "Webhook processed successfully",
    });

  } catch (error) {
    console.error("❌ Webhook Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default clerkWebhook;