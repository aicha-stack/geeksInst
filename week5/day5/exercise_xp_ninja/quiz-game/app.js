
const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const questions = [
  { id: 1, question: "Capitale de la France ?", choices: ["Paris", "Madrid", "Berlin", "Rome"], answer: "Paris", difficulty: "easy" },
  { id: 2, question: "2 + 2 = ?", choices: ["3", "4", "5", "6"], answer: "4", difficulty: "easy" },
  { id: 3, question: "Langage backend Node.js ?", choices: ["Python", "JavaScript", "Ruby", "C#"], answer: "JavaScript", difficulty: "medium" },
  { id: 4, question: "Capital of Japan?", choices: ["Tokyo", "Kyoto", "Osaka", "Hiroshima"], answer: "Tokyo", difficulty: "medium" },
  { id: 5, question: "H2O is the chemical formula for ?", choices: ["Water", "Oxygen", "Hydrogen", "Helium"], answer: "Water", difficulty: "easy" }
];


app.get("/api/questions", (req, res) => {
  res.json(questions);
});


let leaderboard = [];
app.post("/api/score", (req, res) => {
  const { name, score } = req.body;
  leaderboard.push({ name, score });
  leaderboard.sort((a,b) => b.score - a.score);
  res.json(leaderboard);
});

app.get("/api/leaderboard", (req, res) => {
  res.json(leaderboard);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
