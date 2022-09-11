const path = require("path");
const https = require("https");
const cors = require("cors");
const fs = require("fs");
const express = require("express");

const mongoose = require("mongoose");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

// const bodyParser = require('body-parser');
const dotenv = require("dotenv").config();

const app = express();

//credentials: true,
app.use(express.static(path.join(__dirname, "/client/dist")));
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//config
const db = process.env.NODE_APP_MONGO_URI;
const port = process.env.PORT || 3001;

mongoose
  .connect(db)
  .then(() => console.log("Connected to database..."))
  .catch((err) => console.log(err));

//import routes

const userRouter = require("./routes/user");

//routes
app.options("*", cors());
app.use("/user", userRouter);
app.get("*", (req, res) =>
  res.sendFile(path.resolve("client", "dist", "index.html"))
);

const server = https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(port, function () {
    console.log("Server runnning on " + port);
  });

module.exports = server;
