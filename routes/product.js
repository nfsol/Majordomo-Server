const express = require("express");
const { readdirSync, rmSync } = require("fs");
const dir = "./uploads";
const router = express.Router();
var cloudinary = require("cloudinary").v2;

const multer = require("multer");
// const storage = multer.memoryStorage()
// const upload = multer({ storage: storage })
const upload = multer({ dest: "uploads/" });

const auth = require("../middleware/auth");
const Product = require("../models/Product");
const mongoose = require("mongoose");

//Retrieve all products in DB, obviously scales poorly and needs
// rework. Truncated searches and pagination? More targeted search?
//Speaking of rewrites, I really need to clean up
// the mixed promises/callbacks, the errors have gotten "weird".
router.get("/all", auth, async (req, res) => {
  await Product.find({}).then((payload) => {
    res.json({
      message: "Query successful",
      payload,
    });
  });
});

//Inspect individual product
router.get("/:id", auth,(req, res) => {
  Product.findOne({ upc: req.params.id }).then((payload) => {
    console.log(payload)
    res.json({
      message: "Query successful",
      payload,
    });
  });
});

//Delete product. 
router.delete("/:id", auth, async (req,res) => {
  await Product.deleteOne({_id: req.params.id}).then((payload) => {
    res.status(200).json({
      message: "Deletion Successful",
      payload,
    });
  })
})
//Create new Product
router.post("/new", auth, upload.single("image"), async (req, res) => {
  const data = {
    image: req.file,
  };
  try {
    cloudinary.uploader
      .upload(data.image.path)
      .then(async (result) => {
        const newProduct = new Product({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          upc: req.body.upc,
          exp: req.body.bbDate,
          image: result.url,
        });
        await newProduct.save();
        res.status(200).json({ message: "Success" });
        readdirSync(dir).forEach((f) => rmSync(`${dir}/${f}`));
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({
          message: "failure in uploader",
          error,
        });
      });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err,
    });
  }
});

module.exports = router;
