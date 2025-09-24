const chalk = require("chalk");

function showColorfulMessage() {
  console.log(chalk.magenta.bold("🎉 This is a colorful message using Chalk!"));
}

module.exports = showColorfulMessage;
