//exercise1;
console.log("Hello, World!");
//exercise2;
let age: number = 20;
let Name: string = "Aisha";

console.log("Name:", name);
console.log("Age:", age);
//exercise3;
let id: string | number;

id = "ABC123";   
console.log(id);
//exercise4;

function checkNumber(num: number): string {
  if (num > 0) {
    return "Positive";
  } else if (num < 0) {
    return "Negative";
  } else {
    return "Zero";
  }
}

console.log(checkNumber(10));  
console.log(checkNumber(-5));  
console.log(checkNumber(0));  
//exercise5;
function getDetails(name: string, age: number): [string, number, string] {
  const message = `Hello, ${name}! You are ${age} years old.`;
  return [name, age, message];
}

const details = getDetails("Alice", 25);
console.log(details); 
//exercise6;
type Person = {
  name: string;
  age: number;
};

function createPerson(name: string, age: number): Person {
  return { name, age };
}

const person = createPerson("Aisha", 22);
console.log(person); 
//exercise7;
//<input id="username" type="text" />
//<script src="main.js"></script>
const inputElement = document.getElementById("username") as HTMLInputElement;

if (inputElement) {
  inputElement.value = "Aisha";
  console.log("Input value set to:", inputElement.value);
}
//exercise8;
function getAction(role: string): string {
  switch (role) {
    case "admin":
      return "Manage users and settings";
    case "editor":
      return "Edit content";
    case "viewer":
      return "View content";
    case "guest":
      return "Limited access";
    default:
      return "Invalid role";
  }
}

console.log(getAction("admin"));
console.log(getAction("editor"));
console.log(getAction("viewer"));
console.log(getAction("guest"));
console.log(getAction("unknown"));
//exercise9;

function greet(): string;
function greet(name: string): string;
function greet(name?: string): string {
  return name ? `Hello, ${name}!` : "Hello there!";
}

console.log(greet("Aisha")); 
console.log(greet());        
