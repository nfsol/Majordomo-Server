const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.get("/logout", auth, (req, res) => {
  return res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logout Success" });
});

// router.get("/checkToken", auth, function (req, res) {
//   console.log("req.email is: ", req.email);
//   res.json({ email: req.email });  //Do I even need .status(200) here?
//   console.log("checkToken passed");
// });

router.post("/login", async (req, res) => {
  const dbUser = await User.findOne({ email: req.body.email });
  try {
    const payload = { email: dbUser.email };
    const success = await bcrypt.compare(req.body.password, dbUser.password);
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    if (success) {
      res
        .cookie("token", accessToken, { httpOnly: true })
        .status(200)
        .json({ message: "Logged in successfully", token: accessToken });
    } else {
      res.json({ message: "Failed login attempt" });
    }
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const dbUser = await User.findOne({ email: req.body.email });
    if (dbUser == null) {
      const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
      });
      // console.log("newUser is: ", newUser);
      await newUser.save();
      const accessToken = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      if (accessToken) {
        res.cookie("token", accessToken, { httpOnly: true });
        res.status(200).send({
          message: "Registration successful",
        });
      }
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.send({ status: "error", error: "email already exists" });
    }
    console.log(JSON.stringify(error));
    throw error;
  }
});

module.exports = router;
