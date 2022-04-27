function myReduce(array, func, initial) {
  let accumulator = initial || array[0];
  let startIndex = initial ? 0 : 1;
  for (let i = startIndex; i < array.length; i += 1) {
    accumulator = func(accumulator, array[i], i, array);
  }
  return accumulator;
}

let smallest = (result, value) => (result <= value ? result : value);
let sum = (result, value) => result + value;

console.log(myReduce([5, 12, 15, 1, 6], smallest));           // 1
console.log(myReduce([5, 12, 15, 1, 6], sum, 10));            // 49