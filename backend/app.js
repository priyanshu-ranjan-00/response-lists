const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoute.js");
const dogRoutes = require("./routes/dogRoute.js");
const connectDB = require("./db/connectDB.js");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// Connect to MongoDB
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/lists", dogRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
