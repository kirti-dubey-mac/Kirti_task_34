const mongoose = require("mongoose");
const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {
    const { title, content, user } = req.body;
    if (!title || !content || !user) {
      return res.status(400).json({ message: "Title, content and user are required" });
    }
    if (!mongoose.isValidObjectId(user)) {
      return res.status(400).json({ message: "Invalid user id" });
    }
    const post = await Post.create({ title, content, user });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "name email");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { createPost, getPosts };