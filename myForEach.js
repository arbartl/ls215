function myForEach(array, func) {
  for (let i = 0; i < array.length; i += 1) {
    func(array[i], i, array);
  }
}