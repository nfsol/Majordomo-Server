
const mongoose = require("mongoose");

const SpotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },

  url: {
    type: String,
    required: false,
  },
  desc: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Spot", SpotSchema);