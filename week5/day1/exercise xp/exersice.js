//  Exercise 1 :
function compareToTen(num) {
  return new Promise((resolve, reject) => {
    num <= 10 ? resolve(num) : reject("Error");
  });
}

compareToTen(15)
  .then(result => console.log(result))
  .catch(error => console.log(error));

compareToTen(8)
  .then(result => console.log(result))
  .catch(error => console.log(error));

//  Exercise 2 :
const promise2 = new Promise(resolve => {
  setTimeout(() => resolve("success"), 4000);
});
promise2.then(result => console.log(result));

//  Exercise 3 :
Promise.resolve(3).then(result => console.log(result));
Promise.reject("Boo!").catch(error => console.log(error));
