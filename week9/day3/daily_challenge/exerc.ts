

type User = {
  type: 'user';
  name: string;
  age: number;
};

type Product = {
  type: 'product';
  id: number;
  price: number;
};

type Order = {
  type: 'order';
  orderId: string;
  amount: number;
};

type Data = User | Product | Order;

function handleData(dataArray: Data[]): string[] {
  return dataArray.map((item) => {
    if (isUser(item)) {
      return `👤 User: ${item.name}, Age: ${item.age}`;
    } else if (isProduct(item)) {
      return `🛒 Product ID: ${item.id}, Price: ${item.price} MAD`;
    } else if (isOrder(item)) {
      return `📦 Order ID: ${item.orderId}, Amount: ${item.amount} MAD`;
    } else {
      return "⚠️ Unknown data type";
    }
  });
}


function isUser(obj: Data): obj is User {
  return obj.type === "user";
}

function isProduct(obj: Data): obj is Product {
  return obj.type === "product";
}

function isOrder(obj: Data): obj is Order {
  return obj.type === "order";
}


const mixedData: Data[] = [
  { type: "user", name: "Aisha", age: 22 },
  { type: "product", id: 101, price: 250 },
  { type: "order", orderId: "ORD-789", amount: 1200 },
  { type: "user", name: "Samir", age: 28 },
];

console.log(handleData(mixedData));
