/*
Problem Description
Write a program that cleans up user-entered phone numbers so that they can be sent as SMS messages.
Other than digits, the number may also contain special character such as spaces, dash, dot, and
parentheses that should be ignored.

The rules are as follows:

- If the phone number is less than 10 digits, assume that it is a bad number.
- If the phone number is 10 digits, assume that it is good.
- If the phone number is 11 digits and the first number is 1, trim the 1 and use the last 10 digits.
- If the phone number is 11 digits and the first number is not 1, then it is a bad number.
- If the phone number is more than 11 digits, assume that it is a bad number.

For bad numbers, just a return a string of 10 0s.

Input:
- A string comprised of digits and optionally, other special characters

Ouput:
- A string of length 10 comprised solely of digits

Explicit Requirements:
- If number contains anything except digits, they should be ignored (removed)
- Bad numbers should return '0000000000'
  - Less than 10 digits
  - More than 11 digits
  - 11 digits where first digit is not 1
- Good numbers should return the 10 digits that make up the good number
  - Exactly 10 digits
  - If number is 11 digits and first digit is 1, trim the 1 and return the 10 remaining digits

Examples -- 

parsePhone('1.865.690.0049'); // 8656900049
parsePhone('865-690-0048'); // 8656900048
parsePhone('437-8197'); // 0000000000
parsePhone('188826422777'); // 0000000000
parsePhone('28652168613'); // 0000000000
parsePhone(''); // 0000000000
parsePhone('test'); // 0000000000


Data Structure --
- String input can be cleaned up using Regex
- No iteration required, so string can be used as-is


Algorithm --
- Replace any non-digit characters in string using Regex
- Determine length of string and return '0000000000' for invalid inputs
- For 11 digit inputs where first digit is 1, trim 1 and return rest of string
- For valid inputs, return string

*/

function parsePhone(phone) {
  const phoneRegex = /\D/g;
  const cleanPhone = phone.replace(phoneRegex, "");
  const DEFAULT = "0000000000";

  if (!validPhone(cleanPhone)) {
    return DEFAULT;
  } else if (cleanPhone.length === 11 && cleanPhone[0] === "1") {
    return cleanPhone.slice(1);
  } else {
    return cleanPhone;
  }
}

function validPhone(phone) {
  return (
    phone.length > 9 &&
    (phone.length < 11 || (phone.length === 11 && phone[0] === "1"))
  );
}

console.log(parsePhone("1.865.690.0049")); // 8656900049
console.log(parsePhone("865-690-0048")); // 8656900048
console.log(parsePhone("437-8197")); // 0000000000
console.log(parsePhone("188826422777")); // 0000000000
console.log(parsePhone("28652168613")); // 0000000000
console.log(parsePhone("8654378197")); // 8654378197
console.log(parsePhone("(865) 216-2769")); // 8652162769
console.log(parsePhone("")); // 0000000000
console.log(parsePhone("test")); // 0000000000
