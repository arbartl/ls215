/*
Problem Description
The Luhn formula is a simple checksum formula used to validate a variety of identification numbers,
such as credit card numbers and Canadian Social Insurance Numbers.

The formula verifies a number against its included check digit, which is usually appended to a
partial number to generate the full number. This number must pass the following test:

- Counting from the rightmost digit and moving left, double the value of every second digit
- For any digit that thus become 10 or more, subtract 9 from the result
  - 1111 becomes 2121
  - 8763 becomes 7733 (from 2 x 6 = 12 -> 12 - 9 = 3 and 2 x 8 = 16 -> 16 - 9 = 7)
- Add all these digits together
  - 1111 becomes 2121 sums as 2 + 1 + 2 + 1 to give a checksum of 6
  - 8763 becomes 7733, and 7 + 7 + 3 + 3 is 20

If the total (the checksum) ends in 0 (put another way, if the total modulo 10 is congruent to 0),
then the number is valid according to the Luhn Formula; else it is not valid. Thus, 1111 is not
valid (as shown above, it comes out to 6), while 8763 is valid (as shown above, it comes out to 20).

Write a program that, given a number in string format, check if it is valid per the Luhn formula.
This should treat, for example, "2323 2005 7766 3554" as valid. You can ignore all non-numeric
characters in the input string.

Input:
- A string of digits (potentially including spaces and non-numeric charactes which should be ignored)

Ouput:
- True or False depending on whether the string meets the checksum criteria

Examples -- 

luhnChecksum('2323 2005 7766 3554'); // true
luhnChecksum('a2323b2005-7766 3554*'); // true
luhnChecksum('1111'); // false
luhnChecksum('8763'); // true
luhnChecksum(''); //false
luhnChecksum('----'); // false

Data Structure --

- Input will be a string of digits and potentially other non-digit characters which should be ignored.
- Because we need to iterate through the string in reverse order, will likely reverse the string and split
it into an array.
- Array allows transforming and reducing values, which are two operations we'll need to perform.
- Return value will be a boolean after determining if reduced value % 10 === 0

Algorithm --
- Replace non-digit characters with Regex
- Split string into an array of individual digits and reverse for iteration from right to left
- Map string representations of digits to a Number
- Map odd-indexed digits based on the formula ( num * 2 (less 9 if product is > 9))
- Reduce digits to a single value
- Return true if value % 10 === 0 and false if not
*/

function luhnChecksum(number) {
  let cleanNumber = number.replace(/\D/g, "");

  if (!cleanNumber) return false;

  let numberArray = cleanNumber.split("").reverse();
  let mappedNumbers = numberArray.map(Number);
  let convertedNumbers = mappedNumbers.map(luhnFormula);
  let checksum = convertedNumbers.reduce((total, number) => total + number, 0);

  return checksum % 10 === 0;
}

function luhnFormula(number, idx) {
  if (idx % 2 === 1) {
    let doubled = number * 2;
    return doubled > 9 ? doubled - 9 : doubled;
  } else {
    return number;
  }
}

/*
console.log(luhnChecksum("2323 2005 7766 3554")); // true
console.log(luhnChecksum("a2323b2005-7766 3554*")); // true
console.log(luhnChecksum("1111")); // false
console.log(luhnChecksum("8763")); // true
console.log(luhnChecksum("")); //false
console.log(luhnChecksum("----")); // false
console.log(luhnChecksum("4154177680818590")); // true
*/

/*
Write a function that can add a check digit to make the number valid per the Luhn formula, and
return the original number plus that digit.

'2323 2005 7766 355' returns '2323 2005 7766 3554'

Algorithm --
- Similar to previous example, we will determine the current checksum based on the formula
  - We can add a zero to the end of the input string to serve as a placeholder for our digit to determine
  the current checksum. (0 * 2 === 0)
- Given input, we will clean string of any non-digit characters, split into an array, and reverse it
- Append a zero to the input number and call the luhnFormula() function in a map and generate the
current checksum
- After we have the current check sum, we can use Math.ceil(num / 10) * 10 to round up to the next
closest valid number.
- Determine difference between valid number and current checksum
- Return input with checksum validating number appended

*/

function generateChecksum(number) {
  if (luhnChecksum(number)) return number;

  let cleanNumber = number.replace(/\D/g, "");

  let numberArray = (cleanNumber + "0").split("").reverse();
  let mappedNumbers = numberArray.map(Number);
  let convertedNumbers = mappedNumbers.map(luhnFormula);
  let checksum = convertedNumbers.reduce((total, number) => total + number, 0);

  let nextValidChecksum = Math.ceil(checksum / 10) * 10;
  let checksumValidator = nextValidChecksum - checksum;
  return number + checksumValidator;
}

console.log(generateChecksum("2323 2005 7766 355")); // 2323 2005 7766 3554
console.log(generateChecksum("1111")); // 11114
console.log(generateChecksum("876")); // 8763
console.log(generateChecksum("8763")); // 8763
console.log(generateChecksum("25677255")); // 256772559
