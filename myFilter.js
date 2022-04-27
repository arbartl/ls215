function myFilter(array, func) {
  let result = [];
  for (let i = 0; i < array.length; i += 1) {
    if (func(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}