const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// ✅ DEBUG LOG (important)
console.log("CONFESSION ROUTES LOADED");

// routes
app.use("/api/confess", require("./routes/confessionRoutes"));

// test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
