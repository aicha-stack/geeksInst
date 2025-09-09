const mergeWords = (string) => (nextString) => 
  nextString === undefined 
    ? string 
    : mergeWords(string + " " + nextString);

console.log(mergeWords("Hello")()); 


console.log(mergeWords("There")("is")("no")("spoon.")()); 

