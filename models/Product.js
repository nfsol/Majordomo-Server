
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  upc: {
    type: String,
    required: true,
  },
  exp: [{
    type:String
  }],
  image: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Product", ProductSchema);
