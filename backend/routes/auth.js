const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');


JWT_SECRET = process.env.REACT_APP_JWT_SECRET;

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required

router.post('/createuser', [

  body('name', 'Enter a Minimum 3 letters name').isLength({ min: 3 }),
  body('email', "Enter a valid Email").isEmail(),
  body('password', 'Password must have a Minimum of 5 characters').isLength({ min: 5 }),

], 
  async (req, res) => {

    let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });

  }

  try {

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({success, error: "soory user with this email exist" });

    }

    const salt = await bcrypt.genSalt(10);
    const securedPassword = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: securedPassword
    });

    const data = {
      user: {
        id: user.id
      }
    }

    const Auth_Token = jwt.sign(data, JWT_SECRET);
    success= true;
    res.json({success, Auth_Token });

  } catch (error) {
    console.error(error.message)
    res.status(500).send("Some Internal server Error Occured");
  }
}
);


// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required

router.post('/login', [

  body('email', "Enter a valid Email").isEmail(),
  body('password', "password cannot be blank").exists(),

], 
async (req, res) => {

  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });

  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false;
      return res.status(400).json({success, error: "Please try login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false;
      return res.status(400).json({ success, error: "Please try login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }

    const Auth_Token = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success, Auth_Token });

  } catch (error) {
    console.error(error.message)
    res.status(500).send("Some Internal server Error Occured");
  }

});


// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser,  async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router;
