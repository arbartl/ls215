function foo(list) {
  return list.map(function (word) {
      return word.match(/[aeiou]/gi) || [];
    }).reduce(function (acc, letterList) {
      return acc + letterList.length;
    }, 0);
}

console.log(foo(['cart', 'truck', 'cart', 'train']));