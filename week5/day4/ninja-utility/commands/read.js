const fs = require("fs");

function readFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        console.log("File content:\n", data);
    } catch (err) {
        console.error("Error reading file:", err.message);
    }
}

module.exports = readFile;
