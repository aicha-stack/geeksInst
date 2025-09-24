const chalk = require("chalk");

function greet(name) {
    console.log(chalk.green.bold(`Hello, ${name || "Ninja"}! 🥷`));
}

module.exports = greet;
