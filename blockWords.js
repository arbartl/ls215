/*
Problem Description
A collection of spelling blocks has two letters per block, as shown in this list:

B:O   X:K   D:Q   C:P   N:A
G:T   R:E   F:S   J:W   H:U
V:I   L:Y   Z:M

This limits the words you can spell with the blocks to only those words that do not use both
letters from any given block. You can also only use each block once.

Write a function that takes a word string as an argument, and returns true if the word can be
spelled using the set of blocks, or false otherwise. You can consider the letters to be
case-insensitive when you apply the rules.

Input: a word string
Output: true or false depending on if word can be made up with blocks

Examples --

isBlockWord('BATCH');      // true
isBlockWord('BUTCH');      // false
isBlockWord('jest');       // true
isBlockWord('');           // false
isBlockWord('SANDY');      // false
isBlockWord('RAMS');       // true

Data Structure --
- Blocks can be stored in an object with the property name being one of the letter and the value the other letter
  - Using Object.entries() would return an array of [key, value] pairs.
- Can also just store blocks as an array of arrays with both values in each sub-array
- Input will be a string. We can split it into an array if we plan to iterate over the input string.
  - As an array we can filter it and check the length to determine the count of each character in the string

Algorithm -- 
- Code the blocks as an object of key-value pairs with keys for each letter on both sides of block
- Return false if input is empty string
- Split the input string into an array of characters
- Iterate through input string array
  - For each character, check that it is the only one of that character in the array, return false if not
  - For each character, check that it is the only letter from that block in the array, return false if not
- Return true after iteration
*/

const blocks = {
  a: "n",
  b: "o",
  c: "p",
  d: "q",
  e: "r",
  f: "s",
  g: "t",
  h: "u",
  i: "v",
  j: "w",
  k: "x",
  l: "y",
  m: "z",
  n: "a",
  o: "b",
  p: "c",
  q: "d",
  r: "e",
  s: "f",
  t: "g",
  u: "h",
  v: "i",
  w: "j",
  x: "k",
  y: "l",
  z: "m",
};

function isBlockWord(word) {
  if (!word) return false;

  let wordArray = word.toLowerCase().split("");
  let letter = "";
  for (let i = 0; i < wordArray.length; i += 1) {
    letter = wordArray[i];
    if (wordArray.filter((el) => el === letter).length > 1) return false;
    if (wordArray.filter((el) => el === blocks[letter]).length >= 1)
      return false;
  }
  return true;
}

console.log(isBlockWord("BATCH")); // true
console.log(isBlockWord("BUTCH")); // false
console.log(isBlockWord("jest")); // true
console.log(isBlockWord("")); // false
console.log(isBlockWord("SANDY")); // false
console.log(isBlockWord("RAMS")); // true
console.log(isBlockWord("AAB")); // false
console.log(isBlockWord("HELLO")); // false
