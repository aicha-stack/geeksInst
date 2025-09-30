const express = require('express');
const router = express.Router();

const {
  getAllBooks,
  getBookById,
  createBook,
} = require('../controllers/bookController');

router.get('/', getAllBooks);
router.get('/:bookId', getBookById);
router.post('/', createBook);

module.exports = router;
