import express from "express";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.status(200).send("Ninja AI Receptionist is running 🥷");
});

// SMS webhook (Twilio will call this)
app.post("/sms", (req, res) => {
  console.log("INBOUND /sms HIT ✅");
  console.log("Body:", req.body);
  res.status(200).send("OK");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
