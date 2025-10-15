//  Exercise 1: 
function processValue(value: string | number): string {
  if (typeof value === "number") {
    return `$${value.toFixed(2)}`;
  } else {
    return value.split("").reverse().join("");
  }
}

console.log(processValue(100));
console.log(processValue("Aisha"));


// Exercise 2:
function sumNumbersInArray(arr: (number | string)[]): number {
  let sum = 0;
  for (const item of arr) {
    if (typeof item === "number") {
      sum += item;
    }
  }
  return sum;
}

console.log(sumNumbersInArray([1, "2", 3, "4", 5]));


// Exercise 3: 
type AdvancedUser = {
  name: string;
  age: number;
  address?: string;
};

function introduceAdvancedUser(user: AdvancedUser): string {
  if (user.address) {
    return `Hello, my name is ${user.name}, I am ${user.age} years old and I live in ${user.address}.`;
  } else {
    return `Hello, my name is ${user.name} and I am ${user.age} years old.`;
  }
}

console.log(introduceAdvancedUser({ name: "Aisha", age: 22 }));
console.log(introduceAdvancedUser({ name: "Aisha", age: 22, address: "Casablanca" }));


//  Exercise 4: 
function welcomeUser(name: string, greeting?: string): string {
  return `${greeting ?? "Hello"}, ${name}!`;
}

console.log(welcomeUser("Aisha"));
console.log(welcomeUser("Aisha", "Welcome"));
