//  Exercise 1:
type Product = { id: number; name: string };
type Details = { price: number; category: string };
type Item1 = Product & Details;

class Container<T extends object> {
  private items: T[] = [];
  add(item: T): void { this.items.push(item); }
  remove(id: number): void { this.items = this.items.filter((i: any) => i.id !== id); }
  list(): T[] { return this.items; }
}

const store = new Container<Item1>();
store.add({ id: 1, name: "Book", price: 25, category: "Education" });
store.add({ id: 2, name: "Laptop", price: 1200, category: "Electronics" });
store.remove(1);
console.log(store.list());

// 🌟 Exercise 2: 
interface Response1<T> {
  status: number;
  message: string;
  data: T;
}

function parseResponse<T>(json: string): Response1<T> {
  const parsed = JSON.parse(json) as Response1<T>;
  return parsed;
}

const jsonResponse = '{"status":200,"message":"Success","data":{"id":1,"title":"TypeScript Mastery"}}';
const response = parseResponse<{ id: number; title: string }>(jsonResponse);
console.log(response.data.title);

//  Exercise 3:
class Repository<T> {
  private items: T[] = [];
  add(item: T): void { this.items.push(item); }
  get(index: number): T { return this.items[index] as T; }
  list(): T[] { return this.items; }
}

interface User { id: number; name: string; }
const userRepo = new Repository<User>();
userRepo.add({ id :1 , name: "yousra" });
userRepo.add({ id: 2, name: "Samir" });
console.log(userRepo.get(0));
console.log(userRepo.list());
