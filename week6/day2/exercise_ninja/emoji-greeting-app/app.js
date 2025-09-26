
const express = require("express");
const app = express();
const path = require("path");
app.use(express.urlencoded({ extended: true }));
const greetRouter = require("./routes/greet");
app.use("/", greetRouter);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
