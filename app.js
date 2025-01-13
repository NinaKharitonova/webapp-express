require("dotenv").config();

// # INIT EXPRESS
const express = require("express");
const app = express();
const cors = require("cors");
const host = process.env.APP_HOST;
const port = process.env.APP_PORT;
const frontEnd = process.env.APP_FRONTEND_URL;

// # CORS CONFIGURATION
const corsOptions = {
  origin: frontEnd,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// # REGISTERING MIDDLEWARES
app.use(express.json());
app.use(express.static("public"));
app.use(cors(corsOptions));

// # REGISTERING ROUTER
const webRouter = require("./routers/webRouter");
app.use("/api/movie", webRouter);

// # ERROR HADLERS
const notFound = require("./middlewares/notFound");
const errorsHadler = require("./middlewares/errorsHandler");
app.use(notFound);
app.use(errorsHadler);

// # SERVER LISTENING
app.listen(port, () => {
  console.log(`Server listening at ${host}:${port}`);
});
