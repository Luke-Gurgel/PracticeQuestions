/* Question: write a fn that determines if two strings are anagrams */

function isAnagram(s1: string, s2: string): boolean {
  if (s1.length !== s2.length) return false;

  const charMap: { [char: string]: number } = {};

  for (let i = 0; i < s1.length; i++) {
    if (!charMap[s1[i]]) charMap[s1[i]] = 0;
    charMap[s1[i]] += 1;
    if (!charMap[s2[i]]) charMap[s2[i]] = 0;
    charMap[s2[i]] -= 1;
  }

  for (const key in charMap) {
    if (charMap[key] !== 0) return false;
  }

  return true;
}

/* Tests */

import { assertEquals } from "./deps.ts";

Deno.test("isAnagram('', '')", () => {
  const out = isAnagram("", "");
  assertEquals(out, true);
});

Deno.test("isAnagram('a', 'a')", () => {
  const out = isAnagram("a", "a");
  assertEquals(out, true);
});

Deno.test("isAnagram('ab', 'ba')", () => {
  const out = isAnagram("ab", "ba");
  assertEquals(out, true);
});

Deno.test("isAnagram('abc', 'ba')", () => {
  const out = isAnagram("abc", "ba");
  assertEquals(out, false);
});

Deno.test("isAnagram('abc', 'baa')", () => {
  const out = isAnagram("abc", "ba");
  assertEquals(out, false);
});

Deno.test("isAnagram('aabbbcc', 'ababccb')", () => {
  const out = isAnagram("aabbbcc;", "ababccb;");
  assertEquals(out, true);
});
