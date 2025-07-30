const express = require("express");
const { check, validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Post = require("../../models/Post");
const uploadPostImage = require("../../middleware/postUpload");
const Profile = require("../../models/Profile");
const router = express.Router();

//@route   POST api/posts
//@desc    Create new post
//@access  Private
//@algo    fetch user
//         create post object
//         save
router.post(
  "/",
  [
    auth,
    uploadPostImage.array("images", 5),
    [check("text", "Title is required").not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const imageUrls = req.files.map((file) => {
        return `${req.protocol}://${req.get("host")}/uploads/posts/${
          file.filename
        }`;
      });
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        user: req.user.id,
        avatar: user.avatar,
        images: imageUrls,
      });
      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error.");
    }
  }
);

//@route   GET api/posts
//@desc    Get all post
//@access  Private
//@algo    fetch all posts from DB
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error.");
  }
});

//@route   GET api/posts/user/:user_id
//@desc    Get posts by user id
//@access  Private
//@algo    fetch all posts from DB matching user ID
router.get("/user/:user_id", auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.user_id }).sort({
      createdAt: -1,
    });
    if (!posts || posts.length === 0) {
      return res.status(404).json({ msg: "Post not found." });
    }

    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error.");
  }
});

//@route   GET api/posts/:id
//@desc    Get post by id
//@access  Private
//@algo    find post by id
//         return
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found." });
    }
    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post not found." });
    }
    res.status(500).send("Server error.");
  }
});

//@route   DELETE api/posts/:id
//@desc    Delete a post
//@access  Private
//@algo    fetch post
//         check post owner
//         delete(remove)
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found." });
    }
    //check owner
    if (post.user.toString() != req.user.id) {
      return res
        .status(401)
        .json({ msg: "User not authorized to delete this post." });
    }
    if (post.images && post.images.length > 0) {
      post.images.forEach((url) => {
        const filename = url.split("/uploads/posts")[1];
        const filePath = path.join(
          __dirname,
          "..",
          "..",
          "uploads",
          "posts",
          filename
        );

        fs.unlink(filePath, (err) => {
          if (err) {
            console.err("Failed to delete image ", filename, " ", err.message);
          }
        });
      });
    }
    await post.deleteOne();
    res.json({ msg: "Post deleted" });
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post not found." });
    }
    res.status(500).send("Server error.");
  }
});

//@route   PUT api/posts/like/:id
//@desc    Like a post
//@access  Private
//@algo    filter if already liked
//         like(unshift)
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //check if already liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked." });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error.");
  }
});

//@route   PUT api/posts/unlike/:id
//@desc    Unlike a post
//@access  Private
//@algo    filter if already liked
//         get liked index
//         remove that index
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //check if already liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not been liked yet." });
    }
    //get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error.");
  }
});

//@route   POST api/posts/comment/:id
//@desc    Comment on a post
//@access  Private
//@algo    find post by id
//         create new post object
//         save(unshift) in the post comment array
router.post(
  "/comment/:id",
  [auth, [check("text", "Comment is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        user: req.user.id,
        avatar: user.avatar,
      };
      post.comments.unshift(newComment);

      await post.save();
      res.send(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error.");
    }
  }
);

//@route   DELETE api/posts/comment/:id/:comment_id
//@desc    Delete a comment
//@access  Private
//@algo    find post by id
//         create new post object
//         save(unshift) in the post comment array
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found." });
    }

    // Get the comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist." });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized." });
    }

    // Remove the specific comment
    post.comments = post.comments.filter((c) => c.id !== req.params.comment_id);

    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error.");
  }
});

module.exports = router;
