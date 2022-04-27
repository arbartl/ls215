/*
Given two version numbers in the format of integers separated by periods, compare
the two version number determining whether the first is less than, equal to, or
greater than the second.

- If version1 > version2, we should return 1.
- If version1 < version2, we should return -1.
- If version1 === version2, we should return 0.
- If either version number contains characters other than digits and the . character, we should return null.

Explicit:
- Inputs should only contain integers and periods
  - Return null if any inputs are invalid
- For valid inputs, return value is either 1, -1, or 0

Implicit:
- Version numbers are compared using the number in each 'place' in the overall number. The number before the first
period is compared to the same number in the second number.
- Version numbers can be of different length
  - How to compare when version numbers are different lengths?
  - 1.2.0.3 > 1.2.0 && 1.2 === 1.2.0

Examples:

compareVersions('1.1', '1.2'); // -1
compareVersions('1.3.6', '1.2.5.7'); // 1
compareVersions('2.5', '2.5'); // 0
compareVersions('1-2', '2.5'); // null
compareVersions('1.1.0.0.0', '1.1'); // 0
compareVersions('1.1.0.0.1', '1.1'); // 1

Data Structure:

- Input will be a string representation of integers separated by periods
- Output will be either 1, -1, or 0, or null for invalid inputs

Algorithm:

- Convert each number to an array split on '.'
- Map each array to convert strings to numbers
- Iterate over longest version number, and compare each element with the element in the other version at the same index
  - If numbers are not equal, one of the results is greater and a return value can be determined
  - If numbers are equal, and we are comparing against an undefined (shorter version will have undefined values past its length),
  if the longer version element is not zero, the longer string is the greater. If it is zero, need to check the next number.

*/

function compareVersions(version1, version2) {
  let invalidRegex = /^[0-9]+(\.[0-9]+)*$/;
  if (!version1.match(invalidRegex) || !version2.match(invalidRegex))
    return null;
  let [v1Array, v2array] = [
    version1.split(".").map(Number),
    version2.split(".").map(Number),
  ];

  for (let i = 0; i < v1Array.length; i += 1) {
    let value1 = v1Array[i] || 0;
    let value2 = v2array[i] || 0;

    if (value1 > value2) {
      return 1;
    } else if (value1 < value2) {
      return -1;
    }
  }

  return 0;
}

console.log(compareVersions("1.1", "1.2")); // -1
console.log(compareVersions("1.3.6", "1.2.5.7")); // 1
console.log(compareVersions("2.5", "2.5")); // 0
console.log(compareVersions("1-2", "2.5")); // null
console.log(compareVersions("1.1.0.0.0", "1.1")); // 0
console.log(compareVersions("1.1.0.0.1", "1.1")); // 1
