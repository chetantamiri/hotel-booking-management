import User from "../models/user.js";
import { Webhook } from "svix";

 const clerkWebhook = async (req, res) => {
  try {
    // Create Svix webhook instance
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Get Svix headers
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // Verify webhook
    const payload = whook.verify(JSON.stringify(req.body), headers);

    const { data, type } = payload;

    // User data to store in MongoDB
    const userData = {
      _id: data.id,
      name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      email: data.email_addresses[0]?.email_address,
      image: data.image_url,
    };

    switch (type) {
      case "user.created":
        await User.create(userData);
        break;

      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData);
        break;

      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        break;

      default:
        console.log(`Unhandled event type: ${type}`);
    }

    return res.status(200).json({
      success: true,
      message: "Webhook processed successfully",
    });
  } catch (error) {
    console.error("Webhook Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default clerkWebhook;
