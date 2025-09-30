const db = require('../config/db');

const getAllUsers = () => db('users');
const getUserById = (id) => db('users').where({ id }).first();
const getUserByUsername = (username) => db('users').where({ username }).first();
const addUser = async (user, hashedPwd) => {
  return db.transaction(async trx => {
    const [userId] = await trx('users').insert(user);
    await trx('hashpwd').insert({ username: user.username, password: hashedPwd });
    return userId;
  });
};
const updateUser = (id, changes) => db('users').where({ id }).update(changes);

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  addUser,
  updateUser
};
