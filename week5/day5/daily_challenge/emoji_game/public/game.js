let score = 0;
let playerName = prompt("Quel est ton nom ?") || "Anonyme";

function loadEmoji() {
  fetch("/api/emoji")
    .then(res => res.json())
    .then(data => {
      const { emoji, answer, options } = data;
      let html = `<h2>Quel est cet emoji ? ${emoji}</h2>`;
      options.forEach(option => {
        html += `<button onclick="checkAnswer('${option}', '${answer}')">${option}</button>`;
      });
      html += `<p>Score : ${score}</p>`;
      document.getElementById("game").innerHTML = html;
    });
}

function checkAnswer(selected, correct) {
  if (selected === correct) {
    alert("✅ Correct !");
    score++;
  } else {
    alert(`❌ Incorrect ! La bonne réponse était : ${correct}`);
  }
  loadEmoji();
}
function sendScore() {
  fetch("/api/score", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: playerName, score })
  })
  .then(res => res.json())
  .then(data => showLeaderboard(data));
}

function showLeaderboard(data) {
  const ul = document.getElementById("scores");
  ul.innerHTML = "";
  data.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.name} : ${entry.score}`;
    ul.appendChild(li);
  });
}

loadEmoji();


setInterval(sendScore, 15000);
