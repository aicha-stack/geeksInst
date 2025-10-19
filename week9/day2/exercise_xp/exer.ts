//  Exercise 1: 
class Employee {
  private name: string;
  private salary: number;
  public position: string;
  protected department: string;

  constructor(name: string, salary: number, position: string, department: string) {
    this.name = name;
    this.salary = salary;
    this.position = position;
    this.department = department;
  }

  public getEmployeeInfo(): string {
    return `Employee: ${this.name}, Position: ${this.position}`;
  }
}

const emp = new Employee("Aisha", 5000, "Developer", "IT");
console.log(emp.getEmployeeInfo());


//  Exercise 2:
class Product {
  readonly id: number;
  public name: string;
  public price: number;

  constructor(id: number, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  getProductInfo(): string {
    return `${this.name} costs $${this.price}`;
  }
}

const product = new Product(1, "Football Jersey", 79.99);
console.log(product.getProductInfo());


// Exercise 3:
class Animal {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  makeSound(): string {
    return "Some generic sound";
  }
}

class Dog extends Animal {
  makeSound(): string {
    return "Bark";
  }
}

const dog = new Dog("Rex");
console.log(dog.makeSound());


//  Exercise 4: 
class Calculator {
  static add(a: number, b: number): number {
    return a + b;
  }

  static subtract(a: number, b: number): number {
    return a - b;
  }
}

console.log(Calculator.add(5, 3));
console.log(Calculator.subtract(10, 4));


// Exercise 5: 
interface User {
  readonly id: number;
  name: string;
  email: string;
}

interface PremiumUser extends User {
  membershipLevel?: string;
}

function printUserDetails(user: PremiumUser): void {
  console.log(`ID: ${user.id}, Name: ${user.name}, Email: ${user.email}, Membership: ${user.membershipLevel ?? "Standard"}`);
}

const user1: PremiumUser = {
  id: 1,
  name: "Aisha",
  email: "aisha@example.com",
  membershipLevel: "Gold",
};

printUserDetails(user1);
