// Exercise 1
const data = [
  { name: 'Butters', age: 3, type: 'dog' },
  { name: 'Cuty', age: 5, type: 'rabbit' },
  { name: 'Lizzy', age: 6, type: 'dog' },
  { name: 'Red', age: 1, type: 'cat' },
  { name: 'Joey', age: 3, type: 'dog' },
  { name: 'Rex', age: 10, type: 'dog' },
];
let sumDogYearsLoop = 0;
for (const animal of data) {
  if (animal.type === 'dog') sumDogYearsLoop += animal.age * 7;
}
console.log(sumDogYearsLoop);
const sumDogYearsReduce = data
  .filter(animal => animal.type === 'dog')
  .reduce((sum, dog) => sum + dog.age * 7, 0);
console.log(sumDogYearsReduce);

// Exercise 2
const userEmail3 = ' cannotfillemailformcorrectly@gmail.com ';
const cleanedEmail = userEmail3.trim();
console.log(cleanedEmail);

// Exercise 3
const users = [
  { firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
  { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
  { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
  { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
  { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
  { firstName: 'Wes', lastName: 'Reid', role: 'Instructor' },
  { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor' },
];

const usersObject = {};
users.forEach(user => {
  usersObject[`${user.firstName} ${user.lastName}`] = user.role;
});
console.log(usersObject);

// Exercise 4
const letters = ['x', 'y', 'z', 'z'];
const countLettersLoop = {};
for (const letter of letters) {
  countLettersLoop[letter] = countLettersLoop[letter] ? countLettersLoop[letter] + 1 : 1;
}
console.log(countLettersLoop);
const countLettersReduce = letters.reduce((acc, letter) => {
  acc[letter] = acc[letter] ? acc[letter] + 1 : 1;
  return acc;
}, {});
console.log(countLettersReduce);
