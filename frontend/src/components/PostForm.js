import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure axios is installed
import "../styles/postForm.css"

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Ensure user is authenticated
  
      if (!token) {
        console.error("User not authenticated");
        return;
      }
  
      const response = await axios.post(
        `${API_BASE_URL}/api/posts`,
        { title, content },
        {
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
          },
        }
      );
  
      console.log("✅ Post created:", response.data);
      navigate("/blogs"); // Redirect to blogs after post creation
    } catch (error) {
      console.error("❌ Error creating post:", error.response?.data || error.message);
    }
  };
  

  return (
    <div className="create-post">
      <div className="post-card">
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="post-title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        className="post-content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit" className="create-btn">Create Post</button>
    </form>
  </div>
  </div>
  );
};

export default PostForm;
