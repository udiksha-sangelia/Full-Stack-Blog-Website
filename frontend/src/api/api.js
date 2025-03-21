import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/posts";

export const getAllPosts = () => axios.get(API_URL);
export const getPostById = (id) => axios.get(`${API_URL}/${id}`);
export const createPost = (postData) => axios.post(API_URL, postData);
export const updatePost = (id, postData) => axios.put(`${API_URL}/${id}`, postData);
export const deletePost = (id) => axios.delete(`${API_URL}/${id}`);
export const addComment = (id, commentData) => axios.post(`${API_URL}/${id}/comments`, commentData);
export const deleteComment = (postId, commentId) => { return axios.delete(`${API_URL}/${postId}/comments/${commentId}`);};
