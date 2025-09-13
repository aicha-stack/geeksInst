// Exercise 1 : 
const person = {
    name: 'John Doe',
    age: 25,
    location: {
        country: 'Canada',
        city: 'Vancouver',
        coordinates: [49.2827, -123.1207]
    }
}
const {name, location: {country, city, coordinates: [lat, lng]}} = person;
console.log(`I am ${name} from ${city}, ${country}. Latitude(${lat}), Longitude(${lng})`);

//  Exercise 2: 
function displayStudentInfo({first, last}){
    return `Your full name is ${first} ${last}`;
}
console.log(displayStudentInfo({first: 'Elie', last:'Schoppik'}));
 User & id
const users = { user1: 18273, user2: 92833, user3: 90315 };
const usersArray = Object.entries(users);
console.log(usersArray);
const multiplied = usersArray.map(([key, value]) => [key, value * 2]);
console.log(multiplied);

// Exercise 4 :
class Person {
  constructor(name) {
    this.name = name;
  }
}
const member = new Person('John');
console.log(typeof member);

//  Exercise 5 :
class Dog {
  constructor(name) {
    this.name = name;
  }
};
class Labrador extends Dog {
  constructor(name, size) {
    super(name);
    this.size = size;
  }
}

// Exercise 6 : 

console.log(JSON.stringify([2]) === JSON.stringify([2]));
console.log(JSON.stringify({}) === JSON.stringify({}));

const object1 = { number: 5 }; 
const object2 = object1; 
const object3 = object2; 
const object4 = { number: 5};
object1.number = 4;
console.log(object2.number)
console.log(object3.number)
console.log(object4.number)

class Animal {
  constructor(name, type, color) {
    this.name = name;
    this.type = type;
    this.color = color;
  }
}
class Mammal extends Animal {
  sound(sound) {
    return `${sound} I'm a ${this.type}, named ${this.name} and I'm ${this.color}`;
  }
}
const farmerCow = new Mammal("Lily", "cow", "brown and white");
console.log(farmerCow.sound("Moooo"));
