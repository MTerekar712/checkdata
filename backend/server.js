const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const User = require("./models/user");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// home route ✅
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// connect mongodb
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// API route
app.post("/api/users", async (req, res) => {
  try {
    const { name, email, mobile, age } = req.body;

    const newUser = new User({ name, email, mobile, age });
    await newUser.save();

    res.status(201).json({ message: "User saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});