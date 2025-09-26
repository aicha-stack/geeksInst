
const express = require("express");
const app = express();
app.use(express.json());


const todosRouter = require("./routes/todos");
app.use("/todos", todosRouter);
const PORT = 33000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
