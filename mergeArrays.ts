/* Question: Given 2 sorted arrays, A and B, where A is long enough to hold the contents of A and B,
write a function to copy the contents of B into A without using any buffer or additional memory.

Example:
  const a = [1,3,5,0,0,0]
  const b = [2,4,6]
  mergeArrays(a, b)
  a = [1,2,3,4,5,6]
*/

function mergeArrays(a: number[], b: number[]): number[] {
  if (b.length > a.length / 2) {
    throw Error("Invalid arguments");
  }

  let e = a.length - 1;
  let aIdx = b.length - 1;
  let bIdx = b.length - 1;

  while (bIdx >= 0) {
    const aa = aIdx >= 0 ? a[aIdx] : -Infinity;
    a[e] = Math.max(aa, b[bIdx]);
    aa > b[bIdx] ? aIdx-- : bIdx--;
    e--;
  }

  return a;
}

/* Tests */

import { assertEquals, assertThrows } from "./deps.ts";

Deno.test("mergeArrays() merges the arrays while maintaining order", () => {
  assertEquals(
    mergeArrays([1, 3, 5, 0, 0, 0], [2, 4, 6]),
    [1, 2, 3, 4, 5, 6],
  );
});

Deno.test("mergeArrays() merges the arrays while maintaining order", () => {
  assertEquals(
    mergeArrays([1, 2, 3, 0, 0, 0], [4, 5, 6]),
    [1, 2, 3, 4, 5, 6],
  );
});

Deno.test("mergeArrays() merges the arrays while maintaining order", () => {
  assertEquals(
    mergeArrays([4, 5, 6, 0, 0, 0], [1, 2, 3]),
    [1, 2, 3, 4, 5, 6],
  );
});

Deno.test("mergeArrays() throws an error if b is longer than a.length / 2", () => {
  assertThrows(() => {
    mergeArrays([5, 6, 7, 0, 0, 0], [1, 2, 3, 4]);
  });
});
