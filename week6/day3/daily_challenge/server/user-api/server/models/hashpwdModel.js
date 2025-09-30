const db = require('../config/db');

const getHashByUsername = (username) =>
  db('hashpwd').where({ username }).first();

module.exports = {
  getHashByUsername
};
