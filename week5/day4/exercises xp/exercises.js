// EXERCISE 1: 

const products = [
  { name: "Laptop", price: 1200, category: "Electronics" },
  { name: "Shoes", price: 80, category: "Fashion" },
  { name: "Book", price: 20, category: "Education" },
];
module.exports = products;


const products = require("./products");
function findProductByName(name) {
  const product = products.find(p => p.name.toLowerCase() === name.toLowerCase());
  return product ? product : "Product not found!";
}
console.log(findProductByName("Laptop"));
console.log(findProductByName("Shoes"));
console.log(findProductByName("Tablet"));

// EXERCISE 2
export const people = [
  { name: "Aisha", age: 20, location: "Casablanca" },
  { name: "Omar", age: 25, location: "Rabat" },
  { name: "Sara", age: 30, location: "Fes" },
];

import { people } from "./data.js";
function averageAge(arr) {
  const total = arr.reduce((sum, person) => sum + person.age, 0);
  return total / arr.length;
}
console.log("Average Age:", averageAge(people));


// EXERCISE 3: 

const fs = require("fs");
function readFile(fileName) {
  return fs.readFileSync(fileName, "utf8");
}
function writeFile(fileName, content) {
  fs.writeFileSync(fileName, content, "utf8");
}
module.exports = { readFile, writeFile };


const { readFile, writeFile } = require("./fileManager");
const content = readFile("Hello World.txt");
console.log("Reading file:", content);
writeFile("Bye World.txt", "Writing to the file");
console.log("File written successfully!");



 // EXERCISE 4:

export class TodoList {
  constructor() {
    this.tasks = [];
  }
  addTask(task) {
    this.tasks.push({ task, completed: false });
  }
  completeTask(index) {
    if (this.tasks[index]) this.tasks[index].completed = true;
  }
  listTasks() {
    return this.tasks;
  }
}


import { TodoList } from "./todo.js";
const myTodos = new TodoList();
myTodos.addTask("Learn Node.js");
myTodos.addTask("Do homework");
myTodos.addTask("Read a book");
myTodos.completeTask(1);
console.log(myTodos.listTasks());



 // EXERCISE 5:
function add(a, b) {
  return a + b;
}
function multiply(a, b) {
  return a * b;
}
module.exports = { add, multiply };


const _ = require("lodash");
const math = require("./math");
console.log("Addition:", math.add(5, 3));
console.log("Multiplication:", math.multiply(4, 2));
const numbers = [1, 2, 3, 4, 5];
console.log("Sum using lodash:", _.sum(numbers));


//EXERCISE 6:
const chalk = require("chalk");
console.log(chalk.blue("Hello World in Blue!"));
console.log(chalk.red.bold("Error Message"));
console.log(chalk.green.inverse("Success!"));


// EXERCISE 7: 

const fs = require("fs");
const content2 = fs.readFileSync("source.txt", "utf8");
fs.writeFileSync("destination.txt", content2);
console.log("File copied successfully!");

const fs2 = require("fs");
const files = fs2.readdirSync(".");
console.log("Files in directory:", files);
