/* Question: write a fn that takes a string and returns true if it's a palindrome,
and false otherwise */

function isPalindrome(str: string): boolean {
  if (!str) return false;
  let left = 0, right = str.length - 1;
  while (left <= right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}

/* Tests */

import { assertEquals } from "./deps.ts";

Deno.test("isPalindrome('')", () => {
  assertEquals(isPalindrome(""), false);
});

Deno.test("isPalindrome('a')", () => {
  assertEquals(isPalindrome("a"), true);
});

Deno.test("isPalindrome('ab')", () => {
  assertEquals(isPalindrome("ab"), false);
});

Deno.test("isPalindrome('aba')", () => {
  assertEquals(isPalindrome("aba"), true);
});

Deno.test("isPalindrome('acbca')", () => {
  assertEquals(isPalindrome("acbca"), true);
});

Deno.test("isPalindrome('acbcaa')", () => {
  assertEquals(isPalindrome("acbcaa"), false);
});

Deno.test("isPalindrome('xahuisb')", () => {
  assertEquals(isPalindrome("xahuisb"), false);
});
