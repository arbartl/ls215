/*

Problem Description
You are given a list of numbers in a "short-hand" range where only the significant part of the
next number is written because we know the numbers are always increasing
(ex. "1, 3, 7, 2, 4, 1" represents [1, 3, 7, 12, 14, 21]). Some people use different separators
for their ranges (ex. "1-3, 1-2", "1:3, 1:2", "1..3, 1..2" represent the same numbers
[1, 2, 3, 11, 12]). Range limits are always inclusive.

Your job is to return a list of complete numbers.

The possible separators are: ["-", ":", ".."]

"1, 3, 7, 2, 4, 1" --> 1, 3, 7, 12, 14, 21
"1-3, 1-2" --> 1, 2, 3, 11, 12
"1:5:2" --> 1, 2, 3, 4, 5, 6, ... 12
"104-2" --> 104, 105, ... 112
"104-02" --> 104, 105, ... 202
"545, 64:11" --> 545, 564, 565, .. 611

Input: a string representation of a range. String can include digits separated by ',' and ranges
       separated by '-', ':', or '..'.

Output: an array of numbers that represent the input string

Explicit rules --
- Only the "significant" part of a number is included, and the whole number should be able to be
  inferred as the "next number that ends in x". e,g,. 1, 3, 2 => 1, 3, 12 (12 is the next number
  after 3 that ends in 2). 10, 12, 11 => 10, 12, 111 (111 is the next number after 12 that ends
  in 11).
- Ranges should be expanded to contain an array of numbers from the starting number to the next
  number ending in the terminating number. 1-3, 1-2 => 1, 2, 3, 11, 12

Data Structure --

Input will be a string which we will split on ',' to get an array of individual digits and ranges.
This array can then be iterated through and run through the algorithm to determine the next
number that matches our criteria.

Output will be an array of numbers in sequential order that represent the string version of the
range passed into the function

Examples -- 

range("1, 3, 7, 2, 4, 1"); // [1, 3, 7, 12, 14, 21]
range("1-3, 1-2"); // [1, 2, 3, 11, 12]
range("1:5:2"); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
range("104-2"); // [104, 105, ... 112]
range("104-02"); // [104, 105, ... 202]
range("545, 64:11") // [545, 564, 565, .. 611]
range("1, 3, 2"); // [1, 3, 12]
range("10, 12, 11"); // [10, 12, 111]
range("10, 12, 1"); // [10, 12, 21]
range("10, 12-4"); // [10, 12, 13, 14]
range("1-5"); // [1, 2, 3, 4, 5]
range(""); // []

Algorithm --
range(string)
- Split our input string on ',' to generate an array of digits and ranges
- Initialize an empty array to store our return array
- Iterate through the input string array
  - If value is a number (contains no :, -, or ..)
    - Convert it to a Number and compare it to the last digit in the return array  
      - If number > last digit of return array, push it onto the result array
      - Else, determine the next highest number that ends in the given number
        - Make a helper method to determine next highest number - will be used in range function
  - If value is a range, pass it and the last digit of the result array to our expandRange()
    function to generate an array representation. Append the return value to the result array
- Return our result array

getNextNumber(lastNumber, endingValue)
- set currentNumber to lastNumber
- While lastNumber doesn't end in endingValue (can use String.endsWith())
  - increment lastNumber by 1
- return lastNumber

expandRange(string)
- Split input range on ':', '-', or '..' using regex
- Initialize an empty array to store return array
- Iterate through array starting with index 1 until length - 1
  - use getNextNumber(array[idx-1], array[idx]) to get the number the sequence will end with
  - Fill the return array with values using a for loop starting with the value of array[idx-1]
    and ending at getNextNumber return value.

*/

function range(rangeString) {
  if (!rangeString) return [];

  let rangeArray = rangeString.split(",");
  let result = [];
  let last;
  let rangeRegex = /(\:|\-|\.\.)/g;

  rangeArray.forEach((element) => {
    if (!element.match(rangeRegex)) {
      element = Number(element);
      if (!last || element > last) {
        result.push(element);
      } else {
        result.push(getNextNumber(last, element));
      }
    } else {
      result.push(...expandRange(last || 0, element));
    }
    last = result[result.length - 1];
  });

  return result;
}

function expandRange(lastNumber, rangeString) {
  let range = rangeString.split(/(?:\:|\-|\.\.)/g);
  let result = [];

  let start = Number(range[0]);
  if (lastNumber > range[0]) {
    start = getNextNumber(lastNumber, start);
  }

  for (let i = 1; i <= range.length - 1; i += 1) {
    let end = getNextNumber(start, String(range[i]));
    for (let j = start; j <= end; j += 1) {
      result.push(j);
    }
    start = end + 1;
  }
  return result;
}

function getNextNumber(lastNumber, endingValue) {
  let current = lastNumber;
  while (!String(current).endsWith(endingValue)) {
    current += 1;
  }
  return current;
}

range("1, 3, 7, 2, 4, 1"); // [1, 3, 7, 12, 14, 21]
range("1-3, 1-2"); // [1, 2, 3, 11, 12]
range("1:5:2"); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
range("104-2"); // [104, 105, ... 112]
range("104-02"); // [104, 105, ... 202]
range("545, 64:11"); // [545, 564, 565, .. 611]
range("1, 3, 2"); // [1, 3, 12]
range("10, 12, 11"); // [10, 12, 111]
range("10, 12, 1"); // [10, 12, 21]
range("10, 12-4"); // [10, 12, 13, 14]
range("1-5"); // [1, 2, 3, 4, 5]
range(""); // []
range("1--3,   2-5"); // [1, 2, 3, 12, 13, 14, 15]
range("1:3:1, 15, 2-5"); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 15, 22, 23, 24, 25]
