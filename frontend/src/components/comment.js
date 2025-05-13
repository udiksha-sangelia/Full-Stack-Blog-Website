import React from "react";
import axios from "axios";
import "../styles/BlogList.css";

const Comment = ({ comment, postId, onDelete }) => {

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/posts/${postId}/comments/${comment._id}`);
      onDelete(comment._id); // Remove comment from UI
    } catch (error) {
      console.error("❌ Error deleting comment:", error);
    }
  };

  return (
    <div className="comment">
      <p><b>{comment.createdBy || "Anonymous"}:</b> {comment.text}</p>
      <button onClick={handleDelete} className="delete-btn">🗑️ Delete</button>
    </div>
  );
};

export default Comment;
