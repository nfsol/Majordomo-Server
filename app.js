const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

// const bodyParser = require('body-parser');
const dotenv = require("dotenv").config();

const app = express();
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));
  //credentials: true,
app.use(express.static(path.join(__dirname, "../client/build")));
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
app.use("/user", userRouter);
app.get("*", (req, res) => {
  res.send("Server Reached!");
  //res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, function () {
  console.log("Runnning on " + port);
});

module.exports = app;
