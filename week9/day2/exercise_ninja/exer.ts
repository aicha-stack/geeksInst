//  Exercise 1: 
class Employee {
  public name: string;
  private age: number;
  protected salary: number;

  constructor(name: string, age: number, salary: number) {
    this.name = name;
    this.age = age;
    this.salary = salary;
  }

  protected calculateBonus(): number {
    return this.salary * 0.1;
  }

  public getSalaryDetails(): string {
    return `Salary: ${this.salary}`;
  }
}

class Manager extends Employee {
  constructor(name: string, age: number, salary: number) {
    super(name, age, salary);
  }

  public getSalaryDetails(): string {
    const bonus = this.calculateBonus();
    return `Salary: ${this.salary}, Bonus: ${bonus}`;
  }
}

class ExecutiveManager extends Manager {
  constructor(name: string, age: number, salary: number) {
    super(name, age, salary);
  }

  public approveBudget(amount: number): string {
    return `${this.name} approved a budget of $${amount}`;
  }
}

const exec = new ExecutiveManager("Aisha", 30, 10000);
console.log(exec.getSalaryDetails());
console.log(exec.approveBudget(50000));


//  Exercise 2: 
class Shape {
  static totalShapes: number = 0;

  constructor() {
    Shape.totalShapes++;
  }

  static getType(): string {
    return "Generic Shape";
  }
}

class Circle extends Shape {
  radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }

  static getType(): string {
    return "Circle";
  }
}

class Square extends Shape {
  side: number;

  constructor(side: number) {
    super();
    this.side = side;
  }

  getArea(): number {
    return this.side * this.side;
  }

  static getType(): string {
    return "Square";
  }
}

const c = new Circle(5);
const s = new Square(4);
console.log(Circle.getType(), c.getArea());
console.log(Square.getType(), s.getArea());
console.log("Total Shapes:", Shape.totalShapes);


// Exercise 3: 
interface Calculator {
  a: number;
  b: number;
  operate(operation: (x: number, y: number) => number): number;
}

class AdvancedCalculator implements Calculator {
  a: number;
  b: number;

  constructor(a: number, b: number) {
    this.a = a;
    this.b = b;
  }

  operate(operation: (x: number, y: number) => number): number {
    return operation(this.a, this.b);
  }

  add(): number {
    return this.operate((x, y) => x + y);
  }

  subtract(): number {
    return this.operate((x, y) => x - y);
  }

  multiply(): number {
    return this.operate((x, y) => x * y);
  }
}

const calc = new AdvancedCalculator(10, 5);
console.log(calc.add());
console.log(calc.subtract());
console.log(calc.multiply());


//  Exercise 4: 
class Device {
  readonly serialNumber: string;

  constructor(serialNumber: string) {
    this.serialNumber = serialNumber;
  }

  getDeviceInfo(): string {
    return `Serial Number: ${this.serialNumber}`;
  }
}

class Laptop extends Device {
  public model: string;
  public price: number;

  constructor(serialNumber: string, model: string, price: number) {
    super(serialNumber);
    this.model = model;
    this.price = price;
  }

  getDeviceInfo(): string {
    return `Serial Number: ${this.serialNumber}, Model: ${this.model}, Price: $${this.price}`;
  }
}

const laptop = new Laptop("SN12345", "MacBook Pro", 2500);
console.log(laptop.getDeviceInfo());


//  Exercise 5:
interface Product {
  readonly name: string;
  price: number;
  discount?: number;
}

interface Electronics extends Product {
  warrantyPeriod: number;
}

class Smartphone implements Electronics {
  readonly name: string;
  price: number;
  discount?: number;
  warrantyPeriod: number;

  constructor(name: string, price: number, warrantyPeriod: number, discount?: number) {
    this.name = name;
    this.price = price;
    this.warrantyPeriod = warrantyPeriod;
    this.discount = discount;
  }

  getFinalPrice(): number {
    if (this.discount) {
      return this.price - (this.price * this.discount) / 100;
    }
    return this.price;
  }
}

const phone = new Smartphone("iPhone 15", 1200, 24, 10);
console.log(`Name: ${phone.name}, Final Price: $${phone.getFinalPrice()}, Warranty: ${phone.warrantyPeriod} months`);
