/* Question
    Write a function that accepts a string as a single parameter and returns true if
    the string is valid, and false otherwise.

    A string is valid if it the brackets inside of it are correctly closed after opened. A bracket
    is considered to be any one of the following characters: (, ), {, }, [, or ].

    Examples:
    {[()]} -> true
    {}[]() -> true
    {[(])} -> false
    {{[[(())]]}} -> true

    Constraints:
      - the string will only contain these characters
*/

function isValid(str: string) {
  let n = -1;
  while (str.length !== n) {
    n = str.length;
    str = str.replace("{}", "");
    str = str.replace("[]", "");
    str = str.replace("()", "");
  }
  return str.length === 0;
}

function isValidWithStack(str: string) {
  const stack: string[] = [];
  const pairs: { [key: string]: string } = { "{": "}", "[": "]", "(": ")" };

  for (const char of str) {
    const isOpeningBracket = pairs.hasOwnProperty(char);
    if (isOpeningBracket) {
      stack.push(char);
    } else {
      if (!stack.length) return false;
      const lastOpeningBracket = stack.pop() as string;
      const nextClosingBracket = pairs[lastOpeningBracket];
      if (char !== nextClosingBracket) return false;
    }
  }

  return stack.length === 0;
}

import { assertEquals } from "./deps.ts";

Deno.test("returns true", () => {
  assertEquals(isValid("{[()]}"), true);
  assertEquals(isValidWithStack("{[()]}"), true);
});

Deno.test("returns true", () => {
  assertEquals(isValid("{}[]()"), true);
  assertEquals(isValidWithStack("{}[]()"), true);
});

Deno.test("returns true", () => {
  assertEquals(isValid("{{[[(())]]}}"), true);
  assertEquals(isValidWithStack("{{[[(())]]}}"), true);
});

Deno.test("returns true", () => {
  assertEquals(isValid("{[(])}"), false);
  assertEquals(isValidWithStack("{[(])}"), false);
});

Deno.test("returns true", () => {
  assertEquals(isValid("}}})))]]]"), false);
  assertEquals(isValidWithStack("}}})))]]]"), false);
});

Deno.test("returns true", () => {
  assertEquals(isValid(""), true);
  assertEquals(isValidWithStack(""), true);
});
