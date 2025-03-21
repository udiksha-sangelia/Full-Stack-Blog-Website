import React, { useEffect, useState } from "react";
import axios from "axios";
import Comment from "../Comment";
import "../styles/BlogList.css";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4002/api/posts/${postId}`)
      .then(response => setComments(response.data.comments))
      .catch(error => console.error("❌ Error fetching comments:", error));
  }, [postId]);

  const handleDelete = (commentId) => {
    setComments(comments.filter(comment => comment._id !== commentId));
  };

  return (
    <div className="comments-container">
      {comments.length === 0 ? <p>No comments yet.</p> : 
        comments.map(comment => (
          <Comment key={comment._id} comment={comment} postId={postId} onDelete={handleDelete} />
        ))
      }
    </div>
  );
};

export default CommentList;
