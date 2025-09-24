
 // EXERCISE 1: 


const fs = require("fs");
const path = require("path");

function getFileInfo() {
  const filePath = path.join(__dirname, "data", "example.txt");

  const exists = fs.existsSync(filePath);
  console.log("File exists:", exists);

  if (exists) {
    const stats = fs.statSync(filePath);
    console.log("Size (bytes):", stats.size);
    console.log("Created at:", stats.birthtime);
  }
}

module.exports = getFileInfo;


const getFileInfo = require("./file-info");
getFileInfo();



 // EXERCISE 2:

const axios = require("axios");

async function fetchPosts() {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const posts = response.data;
    posts.forEach(post => console.log("Title:", post.title));
  } catch (err) {
    console.error("Error fetching posts:", err.message);
  }
}

module.exports = fetchPosts;

const fetchPosts = require("./fetch-data");
fetchPosts();



// EXERCISE 3:

const { format, addDays } = require("date-fns");

function showDateOperations() {
  const now = new Date();
  const futureDate = addDays(now, 5);
  const formatted = format(futureDate, "yyyy-MM-dd HH:mm:ss");
  console.log("Current Date:", now);
  console.log("Future Date (+5 days):", formatted);
}

module.exports = showDateOperations;
const showDateOperations = require("./date-operations");
showDateOperations();



 //EXERCISE 4: 

const faker = require("@faker-js/faker").faker;

const users = [];

function addFakeUser() {
  const user = {
    name: faker.person.fullName(),
    street: faker.location.streetAddress(),
    country: faker.location.country(),
  };
  users.push(user);
}

function showUsers() {
  console.log(users);
}

module.exports = { addFakeUser, showUsers };

const { addFakeUser, showUsers } = require("./users");
addFakeUser();
addFakeUser();
addFakeUser();
showUsers();

 
 const prompt = require("prompt-sync")();
 const name = prompt("Enter your name: ");
 const street = prompt("Enter your street: ");
 const country = prompt("Enter your country: ");
 users.push({ name, street, country });


//EXERCISE 5: 

function returnNumbers(str) {
  const result = str.match(/\d/g);
  return result ? result.join("") : "";
}

console.log(returnNumbers("k5k3q2g5z6x9bn")); 


//EXERCISE 6:

function validateFullName(fullName) {
  const regex = /^[A-Z][a-z]+ [A-Z][a-z]+$/;
  return regex.test(fullName);
}

console.log(validateFullName("John Doe")); 
console.log(validateFullName("john doe")); 
console.log(validateFullName("JohnDoe")); 
