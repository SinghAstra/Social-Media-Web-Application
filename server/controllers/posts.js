const Post = require("../models/post");
const mongoose = require("mongoose");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });

    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getPostsBySearch = async (req, res) => {
  try {
    const { search, tags } = req.query;

    const title = new RegExp(search, "i");
    const posts = await Post.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const createPost = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(400).json({ message: "UnAuthenticated" });
    }

    const { title, message, tags, selectedFile, name } = req.body;

    const post = new Post({
      title,
      message,
      creator: req.userId,
      tags,
      name,
      selectedFile,
    });

    await post.save();

    res.status(201).json({ data: post });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Post Not Found." });
    }

    const post = await Post.findById(id);

    if (!req.userId || String(post.creator) !== req.userId) {
      return res.status(400).json({ message: "UnAuthenticated" });
    }

    const { title, message, name, tags, selectedFile } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      id,

      { title, message, creator: req.userId, tags, name, selectedFile },

      { new: true }
    );

    res.status(201).json({ data: updatedPost });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const likePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.userId) {
      return res.status(400).json({ message: "UnAuthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Post Not Found." });
    }

    const post = await Post.findById(id);

    const hasLiked = post.likes.includes(req.userId);

    if (hasLiked) {
      post.likes = post.likes.filter((id) => String(id) !== req.userId);
    } else {
      post.likes.push(req.userId);
    }

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

    res.status(201).json({ data: updatedPost });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Post Not Found." });
    }

    if (!req.userId || String(post.creator) !== req.userId) {
      return res.status(400).json({ message: "UnAuthenticated" });
    }

    await Post.findByIdAndDelete(id);

    res.status(201).json({ data: "Deleted Successfully." });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
};
