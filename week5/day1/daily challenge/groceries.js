let client = "John";

const groceries = {
  fruits: ["pear", "apple", "banana"],
  vegetables: ["tomatoes", "cucumber", "salad"],
  totalPrice: "20$",
  other: {
    paid: true,
    meansOfPayment: ["cash", "creditCard"],
  },
};
const displayGroceries = () => {
  groceries.fruits.forEach((fruit) => console.log(fruit));
};
displayGroceries();
const cloneGroceries = () => {
  let user = client;
  client = "Betty";

  console.log("client:", client)
  console.log("user:", user);     
  let shopping = groceries;
  shopping.totalPrice = "35$";
  console.log("shopping.totalPrice:", shopping.totalPrice); 
  console.log("groceries.totalPrice:", groceries.totalPrice); 
  shopping.other.paid = false;
  console.log("shopping.other.paid:", shopping.other.paid);  
  console.log("groceries.other.paid:", groceries.other.paid); 
};


cloneGroceries();