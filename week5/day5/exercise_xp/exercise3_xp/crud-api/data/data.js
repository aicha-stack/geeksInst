
const axios = require("axios");

async function fetchPosts() {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    throw new Error("Failed to fetch posts");
  }
}

module.exports = { fetchPosts };
