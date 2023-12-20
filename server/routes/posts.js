const express = require("express");
const router = express.Router();
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} = require("../controllers/posts");
const authMiddleware = require("../middileware/auth");

router.get("/", getPosts);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", authMiddleware, deletePost);
router.put("/:id/likePost", authMiddleware, likePost);

module.exports = router;
