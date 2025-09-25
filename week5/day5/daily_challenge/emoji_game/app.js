const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


const emojis = [
  { emoji: '😀', name: 'Smile' },
  { emoji: '🐶', name: 'Dog' },
  { emoji: '🌮', name: 'Taco' },
  { emoji: '🍕', name: 'Pizza' },
  { emoji: '🐱', name: 'Cat' },
  { emoji: '🚗', name: 'Car' },
  { emoji: '🌞', name: 'Sun' },
  { emoji: '🍎', name: 'Apple' },
  { emoji: '⚽', name: 'Soccer' },
  { emoji: '🎵', name: 'Music'},
  { emoji: '📚', name: 'Books' },
  { emoji: '✈️', name: 'Airplane' },
  { emoji: '🏀', name: 'Basketball' },
  { emoji: '🌈', name: 'Rainbow' },
  { emoji: '🎉', name: 'Party' }
];


let leaderboard = [];


app.get("/api/emoji", (req, res) => {
  const randomIndex = Math.floor(Math.random() * emojis.length);
  const correctEmoji = emojis[randomIndex];

  
  let options = [correctEmoji.name];
  while (options.length < 4) {
    const rand = emojis[Math.floor(Math.random() * emojis.length)].name;
    if (!options.includes(rand)) options.push(rand);
  }

  options = options.sort(() => Math.random() - 0.5);

  res.json({ emoji: correctEmoji.emoji, answer: correctEmoji.name, options });
});


app.post("/api/score", (req, res) => {
  const { name, score } = req.body;
  leaderboard.push({ name, score });
  leaderboard.sort((a, b) => b.score - a.score);
  res.json(leaderboard);
});

app.get("/api/leaderboard", (req, res) => {
  res.json(leaderboard);
});


const PORT = 55000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
