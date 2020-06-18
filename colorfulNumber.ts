function isColorful(num: number) {
  const digits = numberToArray(num);
  const productSet = new Set<number>();
  let groupingOf = 1;

  while (groupingOf <= digits.length) {
    for (let i = digits.length - 1; i >= 0; i--) {
      let product = digits[i];
      let outOfBounds = false;

      for (let j = i - 1; j >= i - (groupingOf - 1); j--) {
        if (j < 0) {
          outOfBounds = true;
          break;
        }
        product *= digits[j];
      }

      if (productSet.has(product) && !outOfBounds) {
        return false;
      }
      productSet.add(product);
    }
    groupingOf++;
  }

  return true;
}

function numberToArray(num: number) {
  return num.toString().split("").map((str) => parseInt(str)).reverse();
}

import { assertEquals } from "./deps.ts";

Deno.test("it correctly returns false", () => {
  assertEquals(isColorful(326), false);
});

Deno.test("it correctly returns true", () => {
  assertEquals(isColorful(3245), true);
});
