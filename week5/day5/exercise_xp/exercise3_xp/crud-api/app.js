
const express = require("express");
const { fetchPosts } = require("./data/data");

const app = express();


app.use(express.json());


app.get("/api/posts", async (req, res) => {
  try {
    const posts = await fetchPosts();
    console.log("✅ Data successfully retrieved and sent as response");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
