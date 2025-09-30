let currentQuestionIndex = 0;
let score = 0;
let questions = [];

async function fetchQuestions() {
  const res = await fetch('/api/quiz');
  questions = await res.json();
  displayQuestion();
}

function displayQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById('question').textContent = question.question;
  const optionsEl = document.getElementById('options');
  optionsEl.innerHTML = '';
  question.options.forEach(opt => {
    const li = document.createElement('li');
    li.innerHTML = `<label><input type="radio" name="option" value="${opt.option}" /> ${opt.option}</label>`;
    optionsEl.appendChild(li);
  });
}

document.getElementById('submit').addEventListener('click', () => {
  const selected = document.querySelector('input[name="option"]:checked');
  const feedback = document.getElementById('feedback');
  if (!selected) {
    feedback.textContent = 'Please select an option!';
    return;
  }

  const correct = questions[currentQuestionIndex].correct_answer;
  if (selected.value === correct) {
    score++;
    feedback.textContent = 'Correct!';
  } else {
    feedback.textContent = `Wrong! Correct answer: ${correct}`;
  }

  document.getElementById('score').textContent = `Score: ${score}`;

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    setTimeout(() => {
      feedback.textContent = '';
      displayQuestion();
    }, 1000);
  } else {
    setTimeout(() => {
      document.getElementById('question').textContent = 'Quiz Finished!';
      document.getElementById('options').innerHTML = '';
      document.getElementById('submit').style.display = 'none';
    }, 1000);
  }
});

fetchQuestions();
