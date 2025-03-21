import React, { useEffect, useState } from "react";
import { getPostById, deletePost, addComment, deleteComment } from "../api/api";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import trash from "../assests/trash-fill.svg";
import edit from "../assests/pencil-fill.svg";

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();


  console.log("Fetched Post ID:", id);

  // Retrieve user data correctly
  const storedUser = localStorage.getItem("currentUser");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const token = localStorage.getItem("token");

  console.log("Current user from localStorage:", currentUser);


  useEffect(() => {
    const fetchPost = async () => { 
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
       
      });
      setPost(res.data);
    } catch (error) {
        console.error("Failed to fetch post:", error.response?.data || error);
      }
    };
    fetchPost();
  }, [id, token]);

  const handleDeletePost = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;
  
      try {
        const token = localStorage.getItem("token"); // Ensure token is available
        if (!token) {
          alert("Unauthorized! Please log in.");
          return;
        }

        console.log("Attempting to delete post with ID:", id);

    
        await axios.delete(`http://localhost:5000/api/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        alert("post deleted successfully!!");
        navigate("/blogs"); // Redirect after deletion
      } catch (error) {
        console.error("Error deleting post:", error.response?.data?.message || error);
        alert("Failed to delete post.");
      }
    };
    
    const handleAddComment = async (e) => {
      e.preventDefault();
    
      if (!comment.trim()) return alert("Comment cannot be empty"); // Prevent empty comments
    
      if (!token) {
        alert("You must be logged in to add a comment.");
        return;
      }
    
    
      if (!currentUser || !currentUser._id) {
        alert("Error: User is not logged in or userId is missing.");
        return;
      }
    
      try {
        console.log("Sending comment:", { userId: currentUser._id, comment }); // ✅ Sending username instead of ID
    
        const res = await axios.post(
          `http://localhost:5000/api/posts/${id}/comments`,
          { userId: currentUser._id, comment }, // ✅ Sending user NAME, not ID
          { headers: { Authorization: `Bearer ${token}` } }
        );
    
        console.log("Comment added:", res.data);
        setComment(""); // Clear input field
        setPost(res.data); // Refresh comments
      } catch (error) {
        console.error("Error adding comment:", error.response?.data || error);
        alert(`Failed to add comment: ${error.response?.data?.message || "Server error"}`);
      }
    };
    
    
    const handleEditPost = () => {
      navigate(`/edit/${id}`); // Redirect to edit page instantly
    };

    const handleDeleteComment = async (commentId) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Unauthorized! Please log in first.");
          return;
        }
    
        console.log("🗑️ Attempting to delete comment:", commentId);
    
        // Ensure postId is correctly referenced
        const postId = post?._id; // Assuming 'post' is the state variable holding the post details
    
        if (!postId) {
          console.error("Error: Post ID is missing.");
          return;
        }
    
        // API request to delete the comment
        const res = await axios.delete(`http://localhost:5000/api/posts/${postId}/comments/${commentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        console.log("✅ Comment deleted successfully:", res.data);

    
        // Update comments locally without refetching from the server
        setPost((prevPost) => ({
          ...prevPost,
          comments: prevPost.comments.filter((c) => c._id !== commentId),
        }));
      } catch (error) {
        console.error("❌ Error deleting comment:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Failed to delete comment.");
      }
    };
    

  if (!post) return <p>Loading...</p>;

  return (
    <div className="post-page">
      <div className="post-card">
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <p><b>By</b> {post.createdBy?.name || "Unknown"}</p>
        <p><b>Created At:</b> {new Date(post.createdAt).toLocaleString()}</p>
        {currentUser && currentUser._id === post.createdBy?._id && (
        <>
        <button className="trash" onClick={handleDeletePost}>
          <img src={trash} alt="delete" />
        </button>
        <button className="pencil" onClick={handleEditPost}>
          <img src={edit} alt="edit" />
        </button>
        </>
        )}

        <div className="post-action">
          <h3>Comments</h3>
          {post.comments?.length === 0 ? <p>No comments yet.</p> : null}
          {post.comments?.map((c) => {
            console.log("Current User:", currentUser);
            console.log("Post Creator:", post.createdBy);
            console.log("Comment Creator:", c.user._id);
            return (
            <div key={c._id} className="comment-item">
              <strong>{c.user.name}:</strong> {c.comment}
              {currentUser && (currentUser._id === post.createdBy?._id || currentUser._id === c.user._id) && (
              <button className="trash" onClick={() => handleDeleteComment(c._id)}>
                <img src={trash} alt="delete comment" />
              </button>
              )}
            </div>
            );
          })}
          {token ? (
          <form onSubmit={handleAddComment}>
            <input
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <button type="submit">Add Comment</button>
          </form>
           ) : (
            <p>You must be logged in to comment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
