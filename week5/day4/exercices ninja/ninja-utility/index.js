
const { Command } = require("commander");
const program = new Command();

const greet = require("./commands/greet");
const fetchData = require("./commands/fetch");
const readFile = require("./commands/read");

program
  .name("ninja-utility")
  .description("A Node.js CLI utility with multiple commands")
  .version("1.0.0");


program
  .command("greet [name]")
  .description("Display a colorful greeting")
  .action((name) => {
      greet(name);
  });

program
  .command("fetch <url>")
  .description("Fetch data from a given API URL")
  .action((url) => {
      fetchData(url);
  });


program
  .command("read <file>")
  .description("Read and display a file content")
  .action((file) => {
      readFile(file);
  });

program.parse(process.argv);
