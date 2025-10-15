
function validateUnionType(value: any, allowedTypes: string[]): boolean {
  for (const type of allowedTypes) {
    if (typeof value === type) {
      return true;
    }
  }
  return false;
}

const num = 42;
const str = "Aisha";
const bool = true;
const obj = { name: "Aisha" };

console.log(validateUnionType(num, ["string", "number"])); 
console.log(validateUnionType(str, ["boolean", "object"])); 
console.log(validateUnionType(bool, ["boolean", "number"])); 
console.log(validateUnionType(obj, ["object", "string"])); 
