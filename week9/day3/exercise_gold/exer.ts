// Exercise 1:
interface User { name: string; email: string; }
interface Admin { adminLevel: number; }
type AdminUser = User & Admin;
function getProperty(obj: AdminUser, prop: string): any {
  if (prop in obj) return (obj as any)[prop];
  return undefined;
}
const adminUser: AdminUser = { name: "Aisha", email: "aisha@example.com", adminLevel: 3 };
console.log(getProperty(adminUser, "name"));
console.log(getProperty(adminUser, "adminLevel"));
console.log(getProperty(adminUser, "unknown"));

// Exercise 2: 
function castToType<T>(value: any, constructor: { new(...args: any[]): T }): T {
  return value as T;
}
let num = castToType<number>("123" as any, Number as any);
let bool = castToType<boolean>("true" as any, Boolean as any);
console.log(num, bool);

// Exercise 3: 
function getArrayLength<T extends number | string>(arr: T[]): number {
  return (arr as Array<T>).length;
}
console.log(getArrayLength([1, 2, 3]));
console.log(getArrayLength(["a", "b", "c"]));

//  Exercise 4: 
interface Storage1<T> {
  add(item: T): void;
  get(index: number): T;
}
class Box<T> implements Storage1<T> {
  private items: T[] = [];
  add(item: T): void { this.items.push(item); }
  get(index: number): T { return this.items[index]; }
}
const stringBox = new Box<string>();
stringBox.add("Book");
console.log(stringBox.get(0));
const numberBox = new Box<number>();
numberBox.add(100);
console.log(numberBox.get(0));

// Exercise 5: 
interface Item<T> { value: T; }
class Queue<T extends Item<any>> {
  private items: T[] = [];
  add(item: T): void { this.items.push(item); }
  remove(): T | undefined { return this.items.shift(); }
}
const numberQueue = new Queue<Item<number>>();
numberQueue.add({ value: 10 });
numberQueue.add({ value: 20 });
console.log(numberQueue.remove());
console.log(numberQueue.remove());
