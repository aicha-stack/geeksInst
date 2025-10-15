// Exercise 1: 
type MappedType<T> = T extends number ? number : T extends string ? number : never;

function mapType<T extends number | string>(value: T): MappedType<T> {
  if (typeof value === "number") {
    return (value * value) as MappedType<T>;
  } else {
    return (value.length) as MappedType<T>;
  }
}

console.log(mapType(5));
console.log(mapType("Aisha"));


//  Exercise 2: 
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

type Person1 = { name: string; age: number; city: string };

const ninjaPerson: Person1 = { name: "Aisha", age: 22, city: "Casablanca" };

console.log(getProperty(ninjaPerson, "name"));
console.log(getProperty(ninjaPerson, "age"));
console.log(getProperty(ninjaPerson, "city"));


//  Exercise 3:
interface HasNumericProperty {
  [key: string]: number;
}

function multiplyProperty(obj: HasNumericProperty, key: keyof HasNumericProperty, factor: number): number {
  const value = obj[key];
  if (typeof value === "number") {
    return value * factor;
  }
  throw new Error("Property is not numeric");
}

const product = { price: 100, quantity: 5 };
console.log(multiplyProperty(product, "price", 2));
console.log(multiplyProperty(product, "quantity", 3));
