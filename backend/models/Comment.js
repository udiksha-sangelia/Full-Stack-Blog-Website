const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    content: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Owner of the comment
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }, // Related post
    createdAt: { type: Date, default: Date.now },
  });
  
module.exports = mongoose.model("Comment", commentSchema);