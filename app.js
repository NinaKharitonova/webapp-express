require("dotenv").config();
// # INIT EXPRESS
const express = require("express");
const app = express();
const host = process.env.APP_HOST;
const port = process.env.APP_PORT;

// # SERVER LISTENING
app.listen(port, () => {
  console.log(`Server listening at ${host}:${port}`);
});
