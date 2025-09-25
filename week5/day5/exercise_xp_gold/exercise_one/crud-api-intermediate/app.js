
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json()); 
const API_URL = "https://jsonplaceholder.typicode.com/posts";


app.get("/api/posts", async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error: error.message });
  }
});

app.get("/api/posts/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error: error.message });
  }
});


app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post(API_URL, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error: error.message });
  }
});


app.put("/api/posts/:id", async (req, res) => {
  try {
    const response = await axios.put(`${API_URL}/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error: error.message });
  }
});


app.delete("/api/posts/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/${req.params.id}`);
    res.json({ message: `Post ${req.params.id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error: error.message });
  }
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
