// src/api.js
const API_KEY = 'Kk7uAexRt7NxuNXp44s98nVjmLwzD97YQQ8xJZWpchat8OXDRuKLfhAz'; // replace with your actual key
const BASE_URL = 'https://api.pexels.com/v1/';

export async function fetchImages(query, page = 1, perPage = 30) {
  const response = await fetch(
    `${BASE_URL}search?query=${query}&page=${page}&per_page=${perPage}`,
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  );
  const data = await response.json();
  return data.photos;
}
