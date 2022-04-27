function myMap(array, func) {
  let result = [];
  array.forEach(element => result.push(func(element)));
  return result;
}