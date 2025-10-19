// 🌟 Exercise 1: Class Inheritance with Protected Access Modifiers
class Employee1 {
  protected name: string;
  protected salary: number;

  constructor(name: string, salary: number) {
    this.name = name;
    this.salary = salary;
  }

  getDetails(): string {
    return `Name: ${this.name}, Salary: ${this.salary}`;
  }
}

class Manager extends Employee1 {
  public department: string;

  constructor(name: string, salary: number, department: string) {
    super(name, salary);
    this.department = department;
  }

  getDetails(): string {
    return `Name: ${this.name}, Salary: ${this.salary}, Department: ${this.department}`;
  }
}

const manager = new Manager("Aisha", 8000, "IT");
console.log(manager.getDetails());


//  Exercise 2: 
class Car {
  public readonly make: string;
  private readonly model: string;
  public year: number;

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  getCarDetails(): string {
    return `Make: ${this.make}, Model: ${this.model}, Year: ${this.year}`;
  }
}

const car = new Car("Toyota", "Corolla", 2022);
console.log(car.getCarDetails());


//  Exercise 3: 
class MathUtils {
  static PI: number = 3.14159;

  static circumference(radius: number): number {
    return 2 * MathUtils.PI * radius;
  }
}

console.log(MathUtils.circumference(10));


//  Exercise 4: 
interface Operation {
  (a: number, b: number): number;
}

class Addition {
  operate: Operation = (a, b) => a + b;
}

class Multiplication {
  operate: Operation = (a, b) => a * b;
}

const add = new Addition();
const multiply = new Multiplication();

console.log(add.operate(5, 3));
console.log(multiply.operate(5, 3));


//  Exercise 5: 
interface Shape {
  color: string;
  getArea(): number;
}

interface Rectangle extends Shape {
  readonly width: number;
  readonly height: number;
  getPerimeter(): number;
}

class MyRectangle implements Rectangle {
  color: string;
  readonly width: number;
  readonly height: number;

  constructor(color: string, width: number, height: number) {
    this.color = color;
    this.width = width;
    this.height = height;
  }

  getArea(): number {
    return this.width * this.height;
  }

  getPerimeter(): number {
    return 2 * (this.width + this.height);
  }
}

const rect = new MyRectangle("blue", 10, 5);
console.log(`Color: ${rect.color}, Area: ${rect.getArea()}, Perimeter: ${rect.getPerimeter()}`);
