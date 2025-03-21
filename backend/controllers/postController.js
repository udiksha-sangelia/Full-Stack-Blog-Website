const Post = require("../models/Post");
const User = require("../models/User");
const mongoose = require("mongoose");

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("createdBy", "name");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name email _id"); // Fetch only required fields
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("createdBy", "name") // ✅ Fetch name instead of ID
      .populate("comments.user", "name"); // ✅ Populate user names for comments
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const createdBy = req.user ? req.user._id : null;
    const newPost = await Post.create({ title, content, createdBy });
    const populatedPost = await Post.findById(newPost._id).populate("createdBy", "name");
    await newPost.save();
    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const { title, content, createdBy } = req.body;

    // Validate input
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required." });
    }

    let userId;
    if (createdBy) {
      if (!mongoose.Types.ObjectId.isValid(createdBy)) {
        return res.status(400).json({ message: "Invalid user ID." });
      }
      userId = new mongoose.Types.ObjectId(createdBy);
    }

    // Check if post exists
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    

    // Update post
    post.title = title;
    post.content = content;

    if (userId) {
      post.createdBy = userId; // Ensure it's stored correctly
    }
    
    const updatedPost = await post.save();

    console.log("Incoming Update Request:", req.body);
    console.log("Post ID:", req.params.id);


    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;  // Post ID from URL
    const userId = req.user._id; // Logged-in user ID from auth middleware

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // ✅ Ensure only the creator can delete the post
    if (post.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized! Only the post creator can delete this post." });
    }

    await Post.findByIdAndDelete(id);
    // Delete post
    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Add comment to a post
exports.addComment = async (req, res) => {
  try {
    console.log("Incoming comment request:", req.body);

    const { userId, comment } = req.body;

    // Validate input
    if (!userId || !comment.trim()) {
      // console.log("Missing userId or comment:", { userId, comment });
      return res.status(400).json({ message: "User ID and a valid comment are required." });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log("Invalid userId format:", userId);
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    // Find the post by ID
    const post = await Post.findById(req.params.id);
    if (!post) {
      console.log("Post not found for ID:", req.params.id);
      return res.status(404).json({ message: "Post not found" });
    }

    // Ensure comments array exists
    // if (!post.comments) post.comments = [];

    // Add new comment
    post.comments.push({ user, comment });
    // Save the updated post
    await post.save();

    // Populate comments with user details
    const updatedPost = await Post.findById(req.params.id)
      .populate("comments.user", "name email") // Fetching user's name and email

    res.status(201).json(updatedPost);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: error.message });
  }
};


// Delete a comment (Only post creator can delete comments on their post)
exports.deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const userId = req.user._id; // Get logged-in user ID

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Find the comment
    const comment = post.comments.find(comment => comment._id.toString() === commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the logged-in user is either the post creator OR the comment creator
    if (post.createdBy.toString() !== userId.toString() && comment.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized! Only the post owner or comment owner can delete this comment." });
    }

    // Remove the specific comment
    post.comments = post.comments.filter(comment => comment._id.toString() !== commentId);
    await post.save();

    res.status(200).json({ message: "Comment deleted successfully", comments: post.comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};







