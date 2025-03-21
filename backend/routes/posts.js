const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Create a new post
router.post("/api/posts", async (req, res) => {
  try {
    console.log("Received request to create post:", req.body); // Debugging log
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newPost = new Post({
      title,
      content,
      createdBy: req.user._id,
      createdAt: new Date() // Ensure createdAt is stored correctly
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ error: "Server error while creating post" });
  }
});

module.exports = router;
