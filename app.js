const express = require("express");
const path = require("path");
const https = require("https");
const cors = require("cors");
const fs = require("fs");
const cloudinary = require("cloudinary");

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();

const app = express();
const morgan = require("morgan");

app.use(express.static(path.join(__dirname, "/client/dist")));
if (app.get('env') == 'production') {
  app.use(morgan('common', { skip: function(req, res) { return res.statusCode < 400 }, stream: __dirname + '/../morgan.log' }));
} else {
  app.use(morgan('dev'));
}
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
const port = process.env.PORT || 3001;
const db = process.env.NODE_APP_MONGO_URI;
cloudinary.config({ 
  cloud_name: process.env.NODE_APP_CLOUD_NAME, 
  api_key: process.env.NODE_APP_CLOUD_KEY, 
  api_secret: process.env.NODE_APP_CLOUD_SECRET 
});

mongoose
  .connect(db)
  .then(() => console.log("Connected to database..."))
  .catch((err) => console.log(err));

//import routes

const userRouter = require("./routes/user");
const productRouter = require("./routes/product");

//routes
app.options("*", cors());
app.use("/user", userRouter);
app.use("/product",productRouter);
app.get("*", (req, res) =>
  res.sendFile(path.resolve("client", "dist", "index.html"))
);


    app.listen(port, function () {
    console.log("Server runnning on " + port);
  });

module.exports = app;
