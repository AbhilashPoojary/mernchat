const router = require("express").Router();
const Post = require("../models/Post");

//add and edit post
router.post("/add-posts", async (req, res) => {
  const {
    postPicture,
    postDescription,
    username,
    profilePicture,
    userId,
    postId,
  } = req.body;
  try {
    if (postId) {
      const editPost = await Post.findOne({ _id: postId });
      if (editPost) {
        const updatedPost = await Post.findByIdAndUpdate(
          postId,
          {
            postPicture,
            profilePicture,
            postDescription,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } else {
        res.status(400).json("couldnt update post");
      }
    } else {
      const newPost = new Post({
        postPicture,
        postDescription,
        username,
        profilePicture,
        userId,
      });

      const post = await newPost.save();
      res.status(200).json(post);
      console.log(newPost);
    }
  } catch (error) {
    res.status(500).json("couldnt add post");
  }
});

// get all posts
router.get("/all-posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json("couldn't find posts");
  }
});

//like a post
router.post("/like-post", async (req, res) => {
  const { userId, postId } = req.body;
  try {
    const targetPost = await Post.findOne({ _id: postId });
    !targetPost && res.status(400).json("couldnt find post");
    if (targetPost.likes.includes(userId)) {
      await targetPost.updateOne({
        $pull: { likes: userId },
      });
      const updatedPost = await Post.findOne({ _id: postId });
      res.status(200).json(updatedPost);
    } else {
      await targetPost.updateOne({
        $push: { likes: userId },
      });
      const updatedPost = await Post.findOne({ _id: postId });
      res.status(200).json(updatedPost);
    }
  } catch (error) {
    res.status(500).json("couldn't like post");
  }
});

//delete a post
router.post("/delete-post", async (req, res) => {
  const { postId, postUserId } = req.body;
  try {
    const targetPost = await Post.findOne({ _id: postId });
    !targetPost && res.status(400).json("couldnt find post");
    if (targetPost.userId === postUserId) {
      await Post.findByIdAndDelete(postId);
      res.status(200).json("post deleted successfully");
    } else {
      res.status(400).json("you can delete only your post");
    }
  } catch (error) {
    res.status(500).json("couldnt delete the post");
  }
});

//add comment on the post
router.post("/comment-post", async (req, res) => {
  const { postId, userId, userName, userPic, text } = req.body;
  try {
    const targetPost = await Post.findOne({ _id: postId });
    if (targetPost) {
      await targetPost.updateOne({
        $push: { comments: { userId, userName, userPic, text } },
      });
      const commentedPost = await Post.findOne({ _id: postId });
      res.status(200).json(commentedPost);
    } else {
      res.status(400).json("coudnt find post");
    }
  } catch (error) {
    res.status(200).json("something went wrong");
  }
});

module.exports = router;
