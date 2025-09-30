const db = require('../config/db');

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await db('questions');
    const options = await db('options');
    const q_options = await db('questions_options');

    const formatted = questions.map(q => {
      const qOpts = q_options
        .filter(qo => qo.question_id === q.id)
        .map(qo => options.find(o => o.id === qo.option_id));

      return {
        id: q.id,
        question: q.question,
        correct_answer: q.correct_answer,
        options: qOpts
      };
    });

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

