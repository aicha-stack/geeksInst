
const readline = require("readline");
const chalk = require("chalk");
const getWeather = require("./weather");

function startDashboard() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(chalk.cyan("Enter a city name: "), async (city) => {
    await getWeather(city);
    rl.close();
  });
}

module.exports = startDashboard;
