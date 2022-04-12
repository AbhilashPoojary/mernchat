const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
    },
    postPicture: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: [
      {
        userId: String,
        userName: String,
        userPic: String,
        text: String,
      },
    ],
    postDescription: {
      type: String,
    },
    profilePicture: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    userId: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
