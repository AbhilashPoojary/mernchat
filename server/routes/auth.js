const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register
router.post("/register", async (req, res) => {
  const { username, email, password, profilePicture } = req.body;
  try {
    // generate a password
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);

    // create a new user
    const newUser = new User({
      username,
      email,
      profilePicture,
      password: hasedPassword,
    });
    console.log(newUser);
    //save user and send response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    !user && res.status(404).json("user not found");

    const validpswd = await bcrypt.compare(password, user.password);
    !validpswd && res.status(400).json("Password is incorrect");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
