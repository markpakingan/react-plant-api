// server.js file


"use strict";

const app = require("./app");
// const { PORT } = require("./config");
const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});
