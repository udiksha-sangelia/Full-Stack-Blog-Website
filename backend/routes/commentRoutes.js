const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

// Add a comment
router.delete("/:id", async (req, res) => {
  try {
    const commentId = req.params.id;
    await Comment.findByIdAndDelete(commentId);
    res.status(200).json({ message: "✅ Comment deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting comment:", error);
    res.status(500).json({ message: "❌ Server error" });
  }
});

module.exports = router;
