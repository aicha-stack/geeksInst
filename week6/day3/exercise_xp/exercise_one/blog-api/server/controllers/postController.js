
const postModel = require('../models/postModel');

exports.getPosts = async (req, res) => {
  try {
    const posts = await postModel.getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await postModel.getPostById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = await postModel.createPost(title, content);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedPost = await postModel.updatePost(req.params.id, title, content);
    if (!updatedPost) return res.status(404).json({ error: 'Post not found' });
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await postModel.deletePost(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};
