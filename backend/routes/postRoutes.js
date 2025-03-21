const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, postController.getAllPosts);
router.get("/users", authMiddleware, postController.getAllUsers);
router.get("/:id", authMiddleware, postController.getPostById);
router.post("/", authMiddleware, postController.createPost);
router.put("/:id", authMiddleware, postController.updatePost);
router.delete("/:id", authMiddleware, postController.deletePost);
router.post("/:id/comments", authMiddleware, postController.addComment);
router.delete("/:postId/comments/:commentId", authMiddleware, postController.deleteComment);

module.exports = router;
