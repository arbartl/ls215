/*
The Vigenere Cipher encrypts alphabetic text using polyalphabetic substitution. It uses a series of Caesar Ciphers based on the letters of a keyword. Each letter of the keyword is treated as a shift value. For instance, the letter 'B' corresponds to a shift value of 1, and the letter 'd' corresponds to a shift value of 3. In other words, the shift value used for a letter is equal to its index value in the alphabet. This means that the letters 'a'-'z' are equivalent to the numbers 0-25. The uppercase letters 'A'-'Z' are also equivalent to 0-25.

Applying the Vigenere Cipher is done sequentially for each character by applying the current shift value to a Caesar Cipher for that particular character. To make this more concrete, let's look at the following example:

plaintext: Pineapples don't go on pizzas!
keyword: meat

Applying the Vigenere Cipher for each alphabetic character:
plaintext : Pine appl esdo ntgo onpi zzas
shift     : meat meat meat meat meat meat
ciphertext: Bmnx mtpe qwdh zxgh arpb ldal

result: Bmnxmtpeqw dhz'x gh ar pbldal!

Notice that in the example, the key isn't moved forward if the character isn't in the alphabet. Like the Caesar Cipher, the Vigenere Cipher only encrypts alphabetic characters.

Write a function that implements the Vigenere Cipher. The case of the keyword doesn't matter—in other words, the resulting encryption won't change depending on the case of the keyword's letters (e.g., 'MEat' === 'mEaT').

Problem:

Rules --
- Input: two strings - one text to be enciphered, and a keyword used to determine how many characters to shift each character of the text
- Output: a string encryption of the input text
- Explicit:
  - Only letters are affected. Whitespace and non-letter characters are returned as they are.
  - The keyword is case insensitive and each character represents its index in the alphabet
    - a === 0
    - b === 1
    ...
    - y === 25
    - z === 26
  - Input text is case sensitive and uppercase characters should be shifted to uppercase characters, same for lowercase to lowercase
  - If shifted value exceeds length of alphabet, it should wrap around to the beginning
- Implicit:
  - The amount of shift for each character of the text to be encoded is based on its count corresponding to the keyword:
    - The first letter character would be encoded based on the shift value of the first character of the keyword
    - The second letter would be encoded based on the second letter of the keyword, etc.
    - If the keyword was 4 characters, the fifth letter character of the text would be encoded using the shift value of the first keyword character

Examples:

vigenereCipher('Pineapples don't go on pizzas!', 'A'); // Pineapples don't go on pizzas!
vigenereCipher('Pineapples don't go on pizzas!', 'cab'); // Riogaqrlfu dpp't hq oo riabat!
vigenereCipher('Dog', 'Rabbit'); // Uoh
vigenereCipher('abcdef', 'abc'); // bdfegi

Data Structure:
- Function will involve string manipulation
- Since we'll be iterating over the characters, we will likely split the characters into an array in order to take advantage of higher-order functions/list processing like map
- We will use Regex to determine if a character should be altered or not
- Can use built-in string methods String.charCodeAt() and String.fromCharCode() to convert to and from unicode

Algorithm:
- Create regex for non letter characters - /[^a-z]/i
- Create regex for uppercase & lowercase characters - /[A-Z]/ & /[a-z]/
- Create string of alphabet characters - index will relate to shift value
- Split lowercased keyword to an array and map each character to its shift value based on its index in the alphabet string
- Create number variable to track which character of the keyword we are currently using as shift value
- Split input string into an array of characters
- Map each character to its shifted value or itself if non-letter
  - If string matches non-letter regex return char
  - Else use charCodeAt() and fromCharCode() to convert to ascii, add shift amount, and convert back to char. Also increment number variable so the next iteration will use the next character of the keyword.
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
const LOWER_CODE_MAX = 122;
const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

function vigenereEncrypt(text, keyword) {
  let shiftValues = keyword
    .toLowerCase()
    .split("")
    .map((char) => ALPHABET.indexOf(char));
  let currentShiftIndex = 0;
  let result;

  let chars = text.split("");
  return chars
    .map((char) => {
      if (char.match(NON_LETTER)) return char;
      if (currentShiftIndex === keyword.length) currentShiftIndex = 0;

      result = shifted(char, shiftValues[currentShiftIndex]);
      currentShiftIndex += 1;
      return result;
    })
    .join("");
}

function shifted(char, shift) {
  let code = char.charCodeAt(0) + shift;
  let max = char.match(UPPER) ? UPPER_CODE_MAX : LOWER_CODE_MAX;

  if (code > max) code -= ALPHABET.length;
  return String.fromCharCode(code);
}

console.log(vigenereEncrypt("Pineapples don't go on pizzas!", "A")); // Pineapples don't go on pizzas!
console.log(vigenereEncrypt("Pineapples don't go on pizzas!", "cab")); // Riogaqrlfu dpp't hq oo riabat!
console.log(vigenereEncrypt("Dog", "Rabbit")); // Uoh
console.log(vigenereEncrypt("abcdef", "abc")); // acedfh
