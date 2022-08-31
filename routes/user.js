const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const cors = require("cors");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.get("/logout", auth, (req, res) => {
  return res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logout Success" });
});

router.get("/check", auth, function (req, res) {
  console.log("req.email is: ", req.email);
  res.json({ email: req.email });
  console.log("checkToken passed");
});

router.post("/login", async (req, res) => {
  //console.info(req.body)

  try {
    const { email, password } = req.body;
    if (email && password) {
      const dbUser = await User.findOne({ email: req.body.email });
      //console.log("dbUser is " + dbUser);
      if (dbUser) {
        const payload = { email: dbUser.email };
        const success = await bcrypt.compare(
          req.body.password,
          dbUser.password
        );
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        if (success) {
          res.json({ message: "Logged in successfully.", token: accessToken });
        } else {
          res.json({ message: "Failed login attempt." });
        }
      } else res.json({ message: "Missing or incorrect Email or Password" });
    } else res.json({ message: "Missing or incorrect Email or Password." });
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
