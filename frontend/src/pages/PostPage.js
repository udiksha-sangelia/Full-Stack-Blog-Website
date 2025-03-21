import React, { useEffect, useState } from "react"; 
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPostById, deletePost } from "../api/api";
import CommentForm from "../components/CommentForm";
import Comment from "../components/comment";
import "../styles/BlogList.css"; // Import CSS for styling

const PostPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await getPostById(id);
      setPost(res.data);
    } catch (err) {
      setError("Failed to fetch post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await deletePost(id);
      navigate("/blogs");
    } catch (error) {
      setError("Error deleting post. Try again.");
    }
  };

  const refreshPost = () => {
    getPostById(id).then((res) => setPost(res.data));
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="post-page">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p><b>By:</b> {post.createdBy?.name || "Unknown"}</p>
      <p><b>Created At:</b> {post?.createdAt ? new Date(post.createdAt).toLocaleString() : "Unknown"}</p>

      <div className="post-actions">
        <button onClick={handleDelete} className="delete-btn">Delete</button>
        <Link to={`/edit/${id}`} className="edit-btn">Edit</Link>
      </div>

      <h3>Comments</h3>
      <Comment postId={id} /> {/* Display comments using Comments.js */}

      <CommentForm postId={id} refreshPost={refreshPost} />
    </div>
  );
};

export default PostPage;
