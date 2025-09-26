
const express = require("express");
const app = express();
const quizRouter = require("./routes/quiz");
app.use(express.urlencoded({ extended: true }));
app.use("/", quizRouter);
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:4000`);
});
