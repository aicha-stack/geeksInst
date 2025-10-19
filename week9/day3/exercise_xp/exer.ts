// Exercise 1:
type Person = {
  name: string;
  age: number;
};

type Address = {
  street: string;
  city: string;
};

type PersonWithAddress = Person & Address;

const person: PersonWithAddress = {
  name: "Aisha",
  age: 22,
  street: "123 Main Street",
  city: "Casablanca"
};

console.log(person);


//  Exercise 2: 
function describeValue(value: number | string): string {
  if (typeof value === "number") {
    return "This is a number";
  } else if (typeof value === "string") {
    return "This is a string";
  }
  return "Unknown type";
}

console.log(describeValue(42));
console.log(describeValue("Hello"));


// Exercise 3: 
let someValue: any = "This is a string value";
let strLength: number = (someValue as string).length;
console.log(`String length: ${strLength}`);


//  Exercise 4: 
function getFirstElement(arr: (number | string)[]): string {
  const first = arr[0];
  return first as string;
}

console.log(getFirstElement(["Aisha", 10, "TypeScript"]));
console.log(getFirstElement([100, "Code"]));


//  Exercise 5: 
function logLength<T extends { length: number }>(item: T): void {
  console.log(`Length: ${item.length}`);
}

logLength("Hello World");
logLength([1, 2, 3, 4]);


//  Exercise 6: 
type Job = {
  position: string;
  department: string;
};

type Employee = Person & Job;

function describeEmployee(employee: Employee): string {
  if (employee.position === "Manager") {
    return `${employee.name} is a Manager in the ${employee.department} department.`;
  } else if (employee.position === "Developer") {
    return `${employee.name} is a Developer working in the ${employee.department} department.`;
  } else {
    return `${employee.name} works in ${employee.department}.`;
  }
}

const emp1: Employee = { name: "Aisha", age: 23, position: "Manager", department: "HR" };
const emp2: Employee = { name: "Sara", age: 25, position: "Developer", department: "IT" };

console.log(describeEmployee(emp1));
console.log(describeEmployee(emp2));


// Exercise 7: 
function formatInput<T extends { toString(): string }>(input: T): string {
  const strValue = input.toString() as string;
  return `Formatted: ${strValue}`;
}

console.log(formatInput(12345));
console.log(formatInput(true));
console.log(formatInput({ toString: () => "Custom Object" }));
