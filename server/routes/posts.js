const express = require("express");
const router = express.Router();
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} = require("../controllers/posts");
const authMiddleware = require("../middleware/auth");
const processFile = require("../processFile");

router.get("/", getPosts);
router.get("/search", getPosts);
router.post("/", authMiddleware, processFile, createPost);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);
router.put("/:id/likePost", authMiddleware, likePost);

module.exports = router;
