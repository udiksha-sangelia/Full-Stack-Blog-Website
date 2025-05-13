import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/BlogList.css"; // Import CSS
import edit from "../assests/pencil-fill.svg";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage

      if (!token) {
        setError("No token found. Please log in.");
        navigate("/login");
      }

      try {
        const { data } = await axios.get("http://localhost:5000/api/posts", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPosts(data);
      } catch (err) {
        console.error("❌ Error Fetching Posts:", err.response?.data || err);
        setError(err.response?.data?.message ||"Failed to fetch posts. Please check your token.");
      }
    };

    fetchPosts();
  }, [navigate]);

  return (
    <div className="blog"> {/* Main Container */}
      <h1>Welcome to the Blog</h1>

      {/* Create Post Button */}
      <Link to="/create" className="create-post-btn">Create New Post</Link>

      <div className="post-list"> {/* Post List */}
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="post-card"> {/* Post Card */}
              <h2>{post.title}</h2>
              <p>{post.content.substring(0, 500)}</p>
              <p><b>By:</b> {post.createdBy?.name || "Unknown"}</p>
              <p><b>Created At:</b> {new Date(post.createdAt).toLocaleString()}</p>
              

              <div className="post-actions">
                <Link to={`/post/${post._id}`} className="read-more">Read More</Link>
                {/* <Link to={`/edit/${post._id}`} className="edit-btn"><img src= {edit} alt="edit"/></Link> */}
              </div>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default BlogList;
