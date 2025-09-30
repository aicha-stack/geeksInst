const express = require('express');
const path = require('path');
require('dotenv').config();
const quizRoutes = require('./server/routes/quizRoutes');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api/quiz', quizRoutes);
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
