const axios = require("axios");

async function fetchData(url) {
    try {
        const response = await axios.get(url);
        console.log("Fetched Data:", response.data);
    } catch (err) {
        console.error("Error fetching data:", err.message);
    }
}

module.exports = fetchData;
