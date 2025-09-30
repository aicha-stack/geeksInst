require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const todoRoutes = require('./server/routes/todoRoutes');
app.use('/api/todos', todoRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Todo API running on port ${PORT}`));
