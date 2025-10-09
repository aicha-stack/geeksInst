// server/server.js
const express = require('express');
const app = express();
const PORT = 3001;

app.get('/api/hello', (req, res) => {
  res.send({ message: 'Hello From Express' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
