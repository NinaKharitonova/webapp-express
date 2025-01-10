require("dotenv").config();

// # INIT EXPRESS
const express = require("express");
const app = express();
const host = process.env.APP_HOST;
const port = process.env.APP_PORT;

// # REGISTERING MIDDLEWARES
app.use(express.json());
app.use(express.static("public"));

// # REGISTERING ROUTER
const webRouter = require("./routers/webRouter");
app.use("/web", webRouter);

// # ERROR HADLERS
const notFound = require("./middlewares/notFound");
const errorsHadler = require("./middlewares/errorsHandler");
app.use(notFound);
app.use(errorsHadler);

// # SERVER LISTENING
app.listen(port, () => {
  console.log(`Server listening at ${host}:${port}`);
});
