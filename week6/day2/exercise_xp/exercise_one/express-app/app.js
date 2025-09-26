
const express = require("express");
const app = express();
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
