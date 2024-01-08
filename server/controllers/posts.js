const Post = require("../models/post");
const mongoose = require("mongoose");

const getPosts = async (req, res) => {
  try {
    // console.log("In the getPosts");
    let posts;
    // console.log("req.query is ", req.query);
    const { search, tags, page = 1, limit = 8 } = req.query;

    let totalDocuments = await Post.countDocuments({});
    let totalPages = Math.ceil(totalDocuments / limit);

    // console.log("totalDocuments is ", totalDocuments);
    // console.log("totalPages is ", totalPages);
    // console.log("search is ", search);
    // console.log("tags is ", tags);

    if (search || tags) {
      // console.log("Inside the if statement.");
      const title = new RegExp(search, "i");

      const tagsArray = tags.split(",");

      if (search === "") {
        posts = await Post.find({ tags: { $in: tagsArray } })
          .sort({ createdAt: -1 })
          .limit(limit)
          .skip((page - 1) * limit);
      } else {
        posts = await Post.find({
          $or: [{ title }, { tags: { $in: tagsArray } }],
        })
          .sort({ createdAt: -1 })
          .limit(limit)
          .skip((page - 1) * limit);
      }
    } else {
      // console.log("Inside the else statement.");

      posts = await Post.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
    }

    res.status(200).json({ data: posts, page, totalPages });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const createPost = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(400).json({ message: "UnAuthenticated" });
    }
    const url = req.protocol + "://" + req.get("host");
    const file = url + "/files/" + req.file.filename;
    const { title, message, tags, name } = req.body;
    const post = await Post.create({
      title,
      message,
      creator: req.userId,
      tags,
      name,
      selectedFile: file,
    });
    console.log("file is ", file);
    await post.save();
    res.status(201).json({
      message: "Success",
      selectedFile: file,
      post,
    });
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
};
