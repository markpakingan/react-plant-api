// app.js file

"use strict";

const express = require("express");
const cors = require("cors");
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

const plantListRoutes = require("./routes/plantListRoutes");
const userRoutes = require("./routes/userRoutes")
const authRoutes = require("./routes/authRoutes")

app.use(cors());
app.use("/plantlist", plantListRoutes);
app.use("/user", userRoutes)
app.use("/auth", authRoutes)

module.exports = app