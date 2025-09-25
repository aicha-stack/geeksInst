let questions = [];
let current = 0;
let score = 0;
let timer;
let timeLeft = 15;
let playerName = prompt("Quel est ton nom ?") || "Anonyme";

fetch("/api/questions")
  .then(res => res.json())
  .then(data => {
    questions = data;
    showQuestion();
  });

function showQuestion() {
  if (current >= questions.length) {
    document.getElementById("quiz").innerHTML = `<h2>Quiz terminé ! Score : ${score}/${questions.length}</h2>`;
    sendScore();
    return;
  }

  const q = questions[current];
  let html = `<h2>${q.question} (${q.difficulty})</h2>`;
  q.choices.forEach(choice => {
    html += `<div class="choice"><input type="radio" name="answer" value="${choice}"> ${choice}</div>`;
  });
  html += `<div>Temps restant : <span id="time">${timeLeft}</span> secondes</div>`;
  html += `<button onclick="submitAnswer()">Valider</button>`;
  document.getElementById("quiz").innerHTML = html;


  clearInterval(timer);
  timeLeft = 15;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Temps écoulé !");
      current++;
      showQuestion();
    }
  }, 1000);
}

function submitAnswer() {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) return alert("Sélectionne une réponse !");
  
  clearInterval(timer);
  if (selected.value === questions[current].answer) score++;
  current++;
  showQuestion();
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
