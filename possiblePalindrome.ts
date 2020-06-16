/* Question: write a fn that takes a string and returns true if it could be a palindrome
if the characters could be rearranged, and false otherwise */

function couldBePalindrome(str: string): boolean {
  if (!str) return false;

  const charMap: { [char: string]: number } = {};
  for (const char of str) {
    if (!charMap[char]) charMap[char] = 0;
    charMap[char] += 1;
  }

  let hasSeenMiddleChar = false;
  for (const count of Object.values(charMap)) {
    if (count % 2 !== 0 && hasSeenMiddleChar) return false;
    else if (count % 2 !== 0) hasSeenMiddleChar = true;
  }

  return true;
}

/* Tests */

import { assertEquals } from "./deps.ts";

Deno.test("couldBePalindrome('')", () => {
  assertEquals(couldBePalindrome(""), false);
});

Deno.test("couldBePalindrome('a')", () => {
  assertEquals(couldBePalindrome("a"), true);
});

Deno.test("couldBePalindrome('ab')", () => {
  assertEquals(couldBePalindrome("ab"), false);
});

Deno.test("couldBePalindrome('bbaa')", () => {
  assertEquals(couldBePalindrome("bbaa"), true);
});

Deno.test("couldBePalindrome('babca')", () => {
  assertEquals(couldBePalindrome("babca"), true);
});

Deno.test("couldBePalindrome('iadaaius')", () => {
  assertEquals(couldBePalindrome("iadaaius;"), false);
});
