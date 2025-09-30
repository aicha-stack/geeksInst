const db = require('../config/db');

const getAllQuestions = async () => {
  return db('questions');
};

const getQuestionById = async (id) => {
  return db('questions').where({ id }).first();
};

const getOptionsForQuestion = async (questionId) => {
  return db('questions_options')
    .join('options', 'questions_options.option_id', '=', 'options.id')
    .where('questions_options.question_id', questionId)
    .select('options.id', 'options.option');
};

const isAnswerCorrect = async (questionId, optionId) => {
  const question = await getQuestionById(questionId);
  return question.correct_answer === optionId;
};

module.exports = {
  getAllQuestions,
  getQuestionById,
  getOptionsForQuestion,
  isAnswerCorrect,
};
