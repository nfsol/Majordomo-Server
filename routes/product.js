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


// Todo: Stop being lazy and reorder/document these routes. 
// Justification for not doing it now: My partner requires bacon.  

router.get("/table/:pageNumber", async (req, res) => {
  try {
    const pageNumber = parseInt(req.params.pageNumber) || 0;
    const limit = 20; //could pass another param for custom queries
    const result = {};
    const productCount = await Product.countDocuments().exec();
    let startIndex = pageNumber * limit;
    result.data = await Product.find()
      .sort({ "exp.0": 1 })
      .skip(startIndex)
      .limit(limit)
      .exec();
      const joinedArraysPayload = result.data.map((product) => {
        product.exp = product.exp.join(", ");
        return product;
      })
    return res.json({ message: "Posts Fetched successfully", productCount: productCount,payload: joinedArraysPayload });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Sorry, something went wrong" });
  }
});
//Delete existing date on product
router.patch("/cull/:id", auth,(req, res) => {
  console.log(req.body)
  Product.findOneAndUpdate({ _id: req.params.id },{$set:{exp: req.body.exp}},{new:true}).then((payload) => {
    res.json({
      message: "Query successful",
      payload,
    });
  }).catch((err)=>console.log("Delete date route error:",err));
});

//Inspect individual product
router.get("/:id", auth,(req, res) => {
  Product.findOne({ upc: req.params.id }).then((payload) => {
    res.json({
      message: "Query successful",
      payload,
    });
  });
});

// Add additional expirary date to existing product
router.patch("/:id", auth,(req, res) => {
  
  Product.findOneAndUpdate({ upc: req.params.id },{$addToSet:{exp: req.body.exp}}).then((payload) => {
    
    res.json({
      message: "Query successful",
      payload,
    });
  });
});

//Delete product. 
router.delete("/:id", auth, (req,res) => {
   Product.deleteOne({_id: req.params.id}).then((payload) => {
    res.status(200).json({
      message: "Deletion Successful",
      payload,
    });
  })
})
//Create new Product
router.post("/new", auth, upload.single("image"), (req, res) => {
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
          exp: [req.body.bbDate],
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
