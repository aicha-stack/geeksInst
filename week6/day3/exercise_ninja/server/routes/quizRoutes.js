const express = require('express');
const router = express.Router();
const { getAllQuestions } = require('../controllers/quizController');

router.get('/', getAllQuestions);

module.exports = router;
