//exercise1:
function funcOne() {
    let a = 5;
    if(a > 1) {
        a = 3;
    }
    alert(`inside the funcOne function ${a}`);
}
//
funcOne();
let a = 0;
function funcTwo() {
    a = 5;
}
function funcThree() {
    alert(`inside the funcThree function ${a}`);
}

funcThree(); 
funcTwo();   
funcThree(); 
//
function funcFour() {
    window.a = "hello";
}
function funcFive() {
    alert(`inside the funcFive function ${a}`);
}

funcFour();
funcFive(); 
//
let b = 1;
function funcSix() {
    let a = "test";
    alert(`inside the funcSix function ${a}`);
}
funcSix();
//
let c = 2;
if (true) {
    let d = 5;
    alert(`in the if block ${d}`); 
}
alert(`outside of the if block ${c}`);
//exercise2:
const winBattle = () => true;

let experiencePoints = winBattle() ? 10 : 1;

console.log(experiencePoints); 
//exercise3:
const isString = (value) => typeof value === "string";

console.log(isString("hello")); 
console.log(isString([1, 2, 4, 0]));
//exercise4:
const sum = (a, b) => a + b;

console.log(sum(5, 3)); 
//exercise5:
function toGrams1(kg) {
    return kg * 1000;
}
console.log(toGrams1(5));


const toGrams2 = function(kg) {
    return kg * 1000;
};
console.log(toGrams2(7));
const toGrams3 = (kg) => kg * 1000;
console.log(toGrams3(3));
//exercise6:
(function(children, partner, location, job) {
    document.body.innerHTML += 
      `<p>You will be a ${job} in ${location}, and married to ${partner} with ${children} kids.</p>`;
})(3, "Amine", "Paris", "Développeuse");
//exercise7:
<div id="navbar"></div>
(function(userName) {
    const navbar = document.getElementById("navbar");
    navbar.innerHTML = `<div>Welcome ${userName} <img src="profile.png" width="30"/></div>`;
})("John");
//exercise8:
function makeJuice(size) {
    function addIngredients(ing1, ing2, ing3) {
        document.body.innerHTML += 
          `<p>The client wants a ${size} juice, containing ${ing1}, ${ing2}, ${ing3}</p>`;
    }
    addIngredients("apple", "banana", "kiwi");
}
makeJuice("large");
//part2
function makeJuice(size) {
    let ingredients = [];

    function addIngredients(ing1, ing2, ing3) {
        ingredients.push(ing1, ing2, ing3);
    }

    function displayJuice() {
        document.body.innerHTML += 
          `<p>The client wants a  ${size} juice, containing ${ingredients.join(", ")}</p>`;
    }

    addIngredients("apple", "banana", "kiwi");
    addIngredients("mango", "pineapple", "strawberry");
    displayJuice();
}

makeJuice("medium");
