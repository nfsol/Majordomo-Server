const express = require("express");
const path = require("path")
const mongoose = require("mongoose");
const logger = require("morgan");
const dotenv = require("dotenv").config()


const app = express();



 app.use(express.static(path.join(__dirname, '../client/build')));


app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

//config 
const db = process.env.NODE_APP_MONGO_URI;
const port = process.env.PORT || 3001;



mongoose
.connect(db)
.then(() => console.log('Connected to database...'))
.catch(err => console.log(err));

//import routes



//routes


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


app.listen(port, function() {
  console.log("Runnning on " + port);
});


module.exports = app;