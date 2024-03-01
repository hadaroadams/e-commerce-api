require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

//middle wares
// security
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const limiter = rateLimiter({
  windowMS: 15 * 60 * 1000,
  max: 100,
});

// helpers middlerwares
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const connectDB = require("./config/dbconn");
const authRoutes = require("./routers/authRoutes");
const notFound = require("./middlewares/notFound");

const PORT = process.env.PORT || 4300;
connectDB();

app.set("trust proxy", 1);
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(xss());
app.use(cors());
app.use(fileUpload());

// Routes
app.use("/api/v1/auth", authRoutes);

app.use(notFound)

mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
  app.listen(PORT, () => {
    console.log(`server running on Port:${PORT}`);
  });
});
