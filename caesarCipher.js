/*

Write a function that implements the Caesar Cipher. The Caesar Cipher is one of the earliest and simplest ways to encrypt plaintext so that a message can be transmitted securely. It is a substitution cipher in which each letter in a plaintext is substituted by the letter located a given number of positions away in the alphabet. For example, if the letter 'A' is right-shifted by 3 positions, it will be substituted with the letter 'D'. This shift value is often referred to as the key. The "encrypted plaintext" (ciphertext) can be decoded using this key value.

The Caesar Cipher only encrypts letters (including both lower and upper case). Any other character is left as is. The substituted letters are in the same letter case as the original letter. If the key value for shifting exceeds the length of the alphabet, it wraps around from the beginning.

Problem:

Rules --
- Input: a string and a number representing the number of times each character should be shifted
- Output: a string of the shifted characters
- Explicit:
  - Only letters are affected. Other characters including punctuation and numbers are left as is.
  - Shift is case sensitive. Uppercase characters should still be uppercase in the returned string.
  - If shifted value exceeds length of alphabet, it should wrap around to the beginning
- Implicit:
  - Shift amount can exceed 26

- Questions:
  - Can a negative shift value be input to shift characters to the left instead?

Examples:

// simple shift
caesarEncrypt('A', 0);       // "A"
caesarEncrypt('A', 3);       // "D"

// wrap around
caesarEncrypt('y', 5);       // "d"
caesarEncrypt('a', 47);      // "v"

// all letters
caesarEncrypt('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 25);
// "ZABCDEFGHIJKLMNOPQRSTUVWXY"
caesarEncrypt('The quick brown fox jumps over the lazy dog!', 5);
// "Ymj vznhp gwtbs ktc ozrux tajw ymj qfed itl!"

// many non-letters
caesarEncrypt('There are, as you can see, many punctuations. Right?; Wrong?', 2);
// "Vjgtg ctg, cu aqw ecp ugg, ocpa rwpevwcvkqpu. Tkijv?; Ytqpi?"

Data Structure:
- Function will involve string manipulation
- Since we'll be iterating over the characters, we will likely split the characters into an array in order to take advantage of higher-order functions/list processing like map
- We will use Regex to determine if a character should be altered or not
- Can use built-in string methods String.charCodeAt() and String.fromCharCode() to convert to and from unicode

Algorithm:
- Create regex for non letter characters - /[^a-z]/i
- Create regex for uppercase & lowercase characters - /[A-Z]/ & /[a-z]/
- If shift amount exceeds 26, subtract 26 until it doesn't
- Split input string into an array of characters
- Map each character to its shifted value or itself if non-letter
  - If string matches non-letter regex return char
  - Else use charCodeAt() and fromCharCode() to convert to ascii, add shift amount, and convert back to char
    - If value after shift is added exceeds upper limit for that case, subtract 26 from the value
    - Uppercase range: 65-90
    - Lowercase range: 97-122
    - Return shifted char
- Return mapped string

- Create a helper function to use in map method
*/
const NON_LETTER = /[^a-z]/i;
const UPPER = /[A-Z]/;
const UPPER_CODE_MAX = 90;
const LOWER = /[a-z]/;
const LOWER_CODE_MAX = 122;

function caesarEncrypt(string, shift) {
  while (shift > 26) {
    shift -= 26;
  }

  let chars = string.split("");
  return chars.map((char) => shifted(char, shift)).join("");
}

function shifted(char, shift) {
  if (char.match(NON_LETTER)) return char;
  let code = char.charCodeAt(0) + shift;
  let max = char.match(UPPER) ? UPPER_CODE_MAX : LOWER_CODE_MAX;

  if (code > max) code -= 26;
  return String.fromCharCode(code);
}

// simple shift
console.log(caesarEncrypt("A", 0)); // "A"
console.log(caesarEncrypt("A", 3)); // "D"

// wrap around
console.log(caesarEncrypt("y", 5)); // "d"
console.log(caesarEncrypt("a", 47)); // "v"

// all letters
console.log(caesarEncrypt("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 25));
// "ZABCDEFGHIJKLMNOPQRSTUVWXY"
console.log(caesarEncrypt("The quick brown fox jumps over the lazy dog!", 5));
// "Ymj vznhp gwtbs ktc ozrux tajw ymj qfed itl!"

// many non-letters
console.log(
  caesarEncrypt(
    "There are, as you can see, many punctuations. Right?; Wrong?",
    2
  )
);
// "Vjgtg ctg, cu aqw ecp ugg, ocpa rwpevwcvkqpu. Tkijv?; Ytqpi?"
