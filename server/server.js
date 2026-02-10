require("dotenv").config({ path: "./.env" });

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/confess", require("./routes/confessionRoutes"));

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



