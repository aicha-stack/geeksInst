const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Hash = require('../models/hashpwdModel');

const register = async (req, res) => {
    console.log("BODY RECEIVED:", req.body);
  const { email, username, first_name, last_name, password } = req.body;
  if (!email || !username || !password) {
    return res.status(400).json({ message: 'Email, username and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { email, username, first_name, last_name };
    const id = await User.addUser(user, hashedPassword);
    res.status(201).json({ message: 'User registered', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashRecord = await Hash.getHashByUsername(username);
    if (!hashRecord) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, hashRecord.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updated = await User.updateUser(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser
};
