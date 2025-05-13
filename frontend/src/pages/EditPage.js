import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// import "./EditPost.css"; // Import CSS for styling

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem("token"); // ✅ Get token from storage
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }
  
      try {
        const response = await axios.get(`${API_BASE_URL}/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Add token here
          },
        });
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error.response?.data || error);
        setError("Error fetching post data.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchPost();
  }, [id]);
  

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    const token = localStorage.getItem("token"); // ✅ Get token from localStorage
    const userId = localStorage.getItem("userId"); // ✅ Ensure `userId` is stored after login
  
    try {
      await axios.put(`${API_BASE_URL}/api/posts/${id}`, 
        { ...post, createdBy: userId }, // ✅ Ensure `createdBy` is an ObjectId
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ Send token
          },
        }
      );
      navigate("/blogs"); // Redirect after update
    } catch (error) {
      console.error("Error updating post:", error.response?.data || error);
      setError("Failed to update post. Please try again.");
    }
  };
  

  if (loading) return <p>Loading post data...</p>;
  if (error) return <p>{error}</p>;
  
  return (
    <div className="edit-post">
      <div className="post-card">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" className="post-title" name="title" value={post.title} onChange={handleChange} required />

        <label>Content:</label>
        <textarea name="content" className="post-content" value={post.content} onChange={handleChange} required />

        <button type="submit">Update Post</button>
        <button type="button" onClick={() => navigate("/blogs")}>Cancel</button>
      </form>
      </div>
    </div>
  );
};

export default EditPost;
