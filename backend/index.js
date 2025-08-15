// Imports
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRouter = require("./routers/authRouter");
const ticketRouter = require("./routers/ticketRouter");
const fileRouter = require("./routers/fileRouter");
const cors = require("cors");
require("dotenv").config();

// Initializations
const app = express();
const prefix = "/api/v1";

// Connect To DB
mongoose.connect(process.env.MONGO_URI);

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_DOMAIN,
  credentials: true,
}));

// Routes
app.head("/", (_, res) => res.status(200));
app.use(prefix, authRouter);
app.use(prefix, ticketRouter);
app.use(prefix, fileRouter);

// Starting Express Server 
app.listen(process.env.PORT);
