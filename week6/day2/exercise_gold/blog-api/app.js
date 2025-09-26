
const express = require("express");
const app = express();
app.use(express.json());
const postsRouter = require("./routes/posts");
app.use("/posts", postsRouter);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
