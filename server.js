import express from "express";
import twilio from "twilio";

const app = express();

// Middleware to parse Twilio webhook data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Health check (visit this in browser)
app.get("/", (req, res) => {
  res.status(200).send("Ninja AI Receptionist is running 🥷");
});

// SMS webhook (Twilio sends incoming texts here)
app.post("/sms", async (req, res) => {
  try {
    console.log("📩 INBOUND SMS");
    console.log(req.body);

    const fromNumber = req.body.From;
    const incomingMessage = req.body.Body;

    // Simple auto-reply (no AI yet)
    await client.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: fromNumber,
      body:
        "Thanks for texting Ninja Heating & Cooling 🥷\n\n" +
        "We’ve received your message and will be right with you."
    });

    res.status(200).send("OK");
  } catch (error) {
    console.error("❌ SMS ERROR:", error);
    res.status(500).send("Error");
  }
});

// Render provides PORT automatically
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
