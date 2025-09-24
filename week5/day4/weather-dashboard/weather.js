async function getWeather(city) {
  try {
    const apiKey = "ec6792ef2df7d5c413a40202"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`;

    const response = await axios.get(url);
    const data = response.data;

    const temp = data.main.temp;
    const desc = data.weather[0].description;
    const cityName = data.name;

    console.log(chalk.blue.bold(`\n🌤 Weather in ${cityName}`));
    console.log(chalk.green(`Temperature: ${temp} °C`));
    console.log(chalk.yellow(`Condition: ${desc}`));
    console.log(chalk.gray("-----------------------------------\n"));
  } catch (err) {
    console.error(chalk.red("❌ Error fetching weather:"), err.response?.data?.message || err.message);
  }
}