const router = require("express").Router();
const Messages = require("../models/Message");

//add
router.post("/addmessage", async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) {
      return res.status(200).json("message added successfuly");
    } else {
      return res.status(200).json("failed to add message");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get
router.post("/getmessage", async (req, res) => {
  try {
    const { from, to } = req.body;
    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        createdAt: msg.createdAt,
        _id: msg._id,
      };
    });
    res.status(200).json(projectMessages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
