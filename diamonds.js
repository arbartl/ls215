/*
Write a function that displays a four-pointed diamond in an n x n grid, where n is an odd integer supplied as an argument to the function. You may assume that the argument will always be an odd integer.


Rules:
- Input: an odd integer number representing the number of rows and columns of the grid
- Output: string containing spaces and stars to make up a four-pointed diamond of n dimension

  Questions
  - What should be output if an even integer is passed in?
  - What should be output if a non-integer is passed in?
  - Should a string version of a number be accepted and converted to a number?

Examples:
- See test cases

Data Structure:
- Output is soleley comprised of strings
  - We'll be using string concatenation to build the output line by line

Algorithm:
- Initialize two variables to contain the number of spaces and stars for each line
  - Stars should be initialized to 1 and spaces initialized to input - stars / 2
- Initialize a variable to store status of incrementing vs decrementing and set to true
- Set a for loop to start at 1 and increment by 1 up to the input value
  - In each iteration, console.log a string of x spaces, y stars, x spaces
  - If stars < input && incrementing === true
    - Increment stars by two and recalculate spaces based on input - stars / 2
  - Else (stars === input)
    - Set incrementing variable to false
    - Decrement stars by two and recalculate spaces based on input - stars / 2
- Maybe implement a helper function to extract the logic of reassigning the spaces value
  - Can also just place the recalculation logic below the if/else statement that reassigns stars value
*/

function diamond(size) {
  if (typeof size !== "number" || size % 2 === 0) return;

  let stars = 1;
  let spaces = (size - stars) / 2;
  let incrementing = true;

  for (let i = 1; i <= size; i += 1) {
    console.log(" ".repeat(spaces) + "*".repeat(stars) + " ".repeat(spaces));
    if (stars < size && incrementing) {
      stars += 2;
    } else {
      incrementing = false;
      stars -= 2;
    }
    spaces = (size - stars) / 2;
  }
}

diamond(1);
diamond(3);
diamond(9);
diamond(13);
diamond(2);
diamond("5");
