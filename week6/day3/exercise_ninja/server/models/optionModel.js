const db = require('../config/db');
const getAllOptions = async () => {
  return db('options');
};
const getOptionById = async (id) => {
  return db('options').where({ id }).first();
};

module.exports = {
  getAllOptions,
  getOptionById,
};
