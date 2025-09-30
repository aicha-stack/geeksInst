
const pool = require('../config/db');

const getAllPosts = async () => {
  const result = await pool.query('SELECT * FROM posts ORDER BY id ASC');
  return result.rows;
};

const getPostById = async (id) => {
  const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  return result.rows[0];
};

const createPost = async (title, content) => {
  const result = await pool.query(
    'INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *',
    [title, content]
  );
  return result.rows[0];
};

const updatePost = async (id, title, content) => {
  const result = await pool.query(
    'UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *',
    [title, content, id]
  );
  return result.rows[0];
};

const deletePost = async (id) => {
  await pool.query('DELETE FROM posts WHERE id = $1', [id]);
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
