import React, { useState } from "react";
import { addComment } from "../api/api" ;

const CommentForm = ({ postId, refreshPost, createdBy = "Anonymous" }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      await addComment(postId, { createdBy, text: comment });
      setComment("");
      refreshPost(); // Refresh the post to display the new comment
    } catch (error) {
      console.error("Error adding comment:", error.response?.data || error);
      alert("Failed to add comment. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default CommentForm;
