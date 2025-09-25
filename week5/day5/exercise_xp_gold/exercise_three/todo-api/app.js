
const express = require("express");
const app = express();

app.use(express.json());
let todos = [];
let nextId = 1; 


app.post("/api/todos", (req, res) => {
  const { title, completed } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const todo = {
    id: nextId++,
    title,
    completed: completed || false
  };

  todos.push(todo);
  res.status(201).json(todo);
});


app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.get("/api/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.json(todo);
});

app.put("/api/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  const { title, completed } = req.body;
  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});


app.delete("/api/todos/:id", (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Todo not found" });

  const deleted = todos.splice(index, 1);
  res.json(deleted[0]);
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
