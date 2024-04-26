const express = require("express");
const user = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const env = require('dotenv').config().parsed;
const JWT_SECRET = env.JWT_SECRET;

let success = false;
//end point for creating a new user, using /createuser
router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
  ],
  async (req, res) => {
    //checking for basic requirements of name, email, password
    const error = validationResult(req);
    if (!error.isEmpty()) {
      success = false;
      return res.status(400).json({ success, error}); 
    }
    try {
      //checking if the email already exists
      let user1 = await user.findOne({ email: req.body.email });
      if (user1) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Sorry this email already exists." });
      }
      //creating an entry in the database for the user
      user1 = await user.create({
        firstName: req.body.firstName,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        cityOfResidence: req.body.cityOfResidence,
        location: req.body.location
      });
      //sending an auth token using jwt to the user
      const data = {
        user: {
          id: user1._id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.status(200).json({ success, authToken });
    } catch (error) {
      //checking for an error in the try catch block
      success = false;
      res.status(500).json({ success, error });
    }
  }
);

module.exports = router;
