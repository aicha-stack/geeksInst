// Exercise 1
const result1 = [1, 2, 3].map(num => {
  if (typeof num === 'number') return num * 2;
  return;
});
console.log(result1);

// Exercise 2
const result2 = [[0, 1], [2, 3]].reduce(
  (acc, cur) => acc.concat(cur),
  [1, 2]
);
console.log(result2);

// Exercise 3
const arrayNum = [1, 2, 4, 5, 8, 9];
const newArray = arrayNum.map((num, i) => {
  console.log(num, i);
  alert(num);
  return num * 2;
});

// Exercise 4
const array = [[1],[2],[3],[[[4]]],[[[5]]]];
const flattenedArray = array.map(el => Array.isArray(el) ? el.flat() : el).flat();
console.log(flattenedArray);

const greeting = [["Hello", "young", "grasshopper!"], ["you", "are"], ["learning", "fast!"]];
const greetingArray = greeting.map(group => group.join(" "));
console.log(greetingArray);

const greetingString = greetingArray.join(" ");
console.log(greetingString);

const trapped = [[[[[[[[[[[[[[[[[[[[[[[[[[3]]]]]]]]]]]]]]]]]]]]]]]]]];
const untrapped = trapped.flat(Infinity);
console.log(untrapped);
