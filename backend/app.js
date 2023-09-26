// app.js file

"use strict";

const express = require("express");
const app = express();

const plantListRoutes = require("./routes/plantListRoutes");

app.use("/plantlist", plantListRoutes);


module.exports = app