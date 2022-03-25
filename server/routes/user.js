const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all user
router.get("/all/:id", async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update a user
router.put("/:id", async (req, res) => {
  let { userId, isAdmin } = req.body;
  if (userId === req.params.id || isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        res.status(500).json(error);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(userId, { $set: req.body });
      res.status(200).json("your account has been updated");
    } catch (error) {}
  } else {
    return res.status(400).json("you can only update your account");
  }
});

module.exports = router;
