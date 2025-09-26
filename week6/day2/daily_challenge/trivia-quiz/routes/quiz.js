
const express = require("express");
const router = express.Router();
const triviaQuestions = [
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "Which planet is known as the Red Planet?", answer: "Mars" },
    { question: "What is the largest mammal in the world?", answer: "Blue whale" },
];
let currentQuestionIndex = 0;
let score = 0;
function renderPage(content) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Trivia Quiz</title>
            <style>
                body {
                    background: linear-gradient(135deg, #f8bbd0 0%, #fce4ec 100%);
                    font-family: 'Segoe UI', Arial, sans-serif;
                    min-height: 100vh;
                    margin: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .container {
                    background: #fff0f6;
                    padding: 2.5rem 2rem;
                    border-radius: 22px;
                    box-shadow: 0 8px 32px rgba(233, 30, 99, 0.13);
                    max-width: 400px;
                    width: 100%;
                    text-align: center;
                    border: 2px solid #f06292;
                }
                h1 {
                    color: #d81b60;
                    margin-bottom: 1.5rem;
                    font-family: 'Pacifico', cursive, Arial, sans-serif;
                    letter-spacing: 1px;
                }
                p {
                    font-size: 1.15rem;
                    color: #ad1457;
                }
                input[type="text"] {
                    padding: 0.7rem;
                    border-radius: 8px;
                    border: 1.5px solid #f06292;
                    width: 80%;
                    margin-bottom: 1.2rem;
                    font-size: 1rem;
                    background: #fff;
                    color: #ad1457;
                    outline: none;
                    transition: border 0.2s;
                }
                input[type="text"]:focus {
                    border: 2px solid #d81b60;
                }
                button {
                    background: linear-gradient(90deg, #f06292 0%, #f8bbd0 100%);
                    color: #fff;
                    border: none;
                    border-radius: 8px;
                    padding: 0.7rem 1.5rem;
                    font-size: 1rem;
                    cursor: pointer;
                    font-weight: bold;
                    transition: background 0.2s, box-shadow 0.2s;
                    box-shadow: 0 2px 8px rgba(233, 30, 99, 0.10);
                }
                button:hover {
                    background: linear-gradient(90deg, #d81b60 0%, #f06292 100%);
                }
                .feedback {
                    margin-bottom: 1rem;
                    font-size: 1.1rem;
                }
                .score {
                    font-size: 1.3rem;
                    font-weight: bold;
                    color: #d81b60;
                }
                a {
                    display: inline-block;
                    margin-top: 1.5rem;
                    text-decoration: none;
                    color: #fff;
                    background: linear-gradient(90deg, #f06292 0%, #f8bbd0 100%);
                    padding: 0.7rem 1.5rem;
                    border-radius: 8px;
                    font-weight: bold;
                    transition: background 0.2s;
                    box-shadow: 0 2px 8px rgba(233, 30, 99, 0.10);
                }
                a:hover {
                    background: linear-gradient(90deg, #d81b60 0%, #f06292 100%);
                }
                
                .container:before {
                    content: "💖";
                    font-size: 2.2rem;
                    display: block;
                    margin-bottom: 0.5rem;
                    animation: heartBeat 1.5s infinite;
                }
                @keyframes heartBeat {
                    0%, 100% { transform: scale(1);}
                    20% { transform: scale(1.2);}
                    40% { transform: scale(0.95);}
                    60% { transform: scale(1.1);}
                    80% { transform: scale(0.98);}
                }
            </style>
            <link href="https://fonts.googleapis.com/css?family=Pacifico&display=swap" rel="stylesheet">
        </head>
        <body>
            <div class="container">
                ${content}
            </div>
        </body>
        </html>
    `;
}

router.get("/quiz", (req, res) => {
    currentQuestionIndex = 0;
    score = 0;

    const question = triviaQuestions[currentQuestionIndex].question;
    const html = renderPage(`
        <h1>Trivia Quiz</h1>
        <form method="POST" action="/quiz">
            <p>${question}</p>
            <input type="text" name="answer" placeholder="Your answer..." required>
            <br>
            <button type="submit">Submit</button>
        </form>
    `);
    res.send(html);
});

router.post("/quiz", (req, res) => {
    const userAnswer = req.body.answer;
    const correctAnswer = triviaQuestions[currentQuestionIndex].answer;

    let feedback = "";
    if (userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
        score++;
        feedback = `<div class="feedback" style="color:#43a047;">✅ Correct!</div>`;
    } else {
        feedback = `<div class="feedback" style="color:#e53935;">❌ Wrong! The correct answer was: <b>${correctAnswer}</b></div>`;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex >= triviaQuestions.length) {
        res.redirect("/quiz/score");
    } else {
        const nextQuestion = triviaQuestions[currentQuestionIndex].question;
        const html = renderPage(`
            <h1>Trivia Quiz</h1>
            ${feedback}
            <form method="POST" action="/quiz">
                <p>${nextQuestion}</p>
                <input type="text" name="answer" placeholder="Your answer..." required>
                <br>
                <button type="submit">Submit</button>
            </form>
        `);
        res.send(html);
    }
});

router.get("/quiz/score", (req, res) => {
    const html = renderPage(`
        <h1>Trivia Quiz - Final Score</h1>
        <div class="score">Your score: ${score} / ${triviaQuestions.length}</div>
        <a href="/quiz">Play Again</a>
    `);
    res.send(html);
});

module.exports = router;
