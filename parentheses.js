function isBalanced(string) {
  let stack = [];
  for (let i = 0; i < string.length; i += 1) {
    if (string[i] === '(') {
      stack.push(string[i]);
    } else if (string[i] === ')') {
      if (stack.pop() !== '(') return false;
    }
  }
  return stack.length === 0;
}

console.log(isBalanced('What (is) this?'));        // true
console.log(isBalanced('What is) this?'));         // false
console.log(isBalanced('What (is this?'));         // false
console.log(isBalanced('((What) (is this))?'));    // true
console.log(isBalanced('((What)) (is this))?'));   // false
console.log(isBalanced('Hey!'));                   // true
console.log(isBalanced(')Hey!('));                 // false
console.log(isBalanced('What ((is))) up('));       // false