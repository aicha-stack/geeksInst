
const express = require("express");
const router = express.Router();
const emojis = ["😀", "🎉", "🌟", "🎈", "👋"];
router.get("/", (req, res) => {
  const emojiOptions = emojis.map(
    (emoji) => `<option value="${emoji}">${emoji}</option>`
  ).join("");

  const formHTML = `
    <h1>Emoji Greeting App</h1>
    <form action="/greet" method="POST">
      <label for="name">Your Name:</label>
      <input type="text" id="name" name="name" required>
      <br><br>
      <label for="emoji">Choose an emoji:</label>
      <select id="emoji" name="emoji">
        ${emojiOptions}
      </select>
      <br><br>
      <button type="submit">Greet Me!</button>
    </form>
  `;
  res.send(formHTML);
});
router.post("/greet", (req, res) => {
  const { name, emoji } = req.body;

  if (!name || !emoji) {
    return res.send("<h2>Please enter your name and choose an emoji!</h2>");
  }

  const greetingHTML = `
    <h1>🎉 Hello, ${name}! ${emoji} 🎉</h1>
    <a href="/">Go back</a>
  `;
  res.send(greetingHTML);
});

module.exports = router;
