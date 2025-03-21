import React, { useEffect, useState } from "react";
import { getAllPosts } from "../api/api";
import { Link } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllPosts()
    .then((res) => {
      setPosts(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching posts:", err);
      setError("Failed to load posts. Please try again later.");
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div class="blog_posts">
      <h2>Blog Posts</h2>
      <Link to="/create">Create New Post</Link>
      {posts.length === 0 ? (
        <p>No blog posts available.</p>
      ) : (
      posts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>By {post.createdBy}</p>
          <p><b>Created At:</b> {new Date(post.createdAt).toLocaleString()}</p>
          <Link to={`/post/${post._id}`}>Read More</Link>
        </div>
      ))
    )}
    </div>
  );
};

export default PostList;
