/* Implement a Queue with 2 Stacks */

class Queue {
  private stackIn: number[];
  private stackOut: number[];

  constructor() {
    this.stackIn = [];
    this.stackOut = [];
  }

  enqueue(num: number) {
    this.stackIn.push(num);
    return this;
  }

  dequeue(): number | undefined {
    if (!this.stackOut.length) {
      while (this.stackIn.length) {
        const num = this.stackIn.pop() as number;
        this.stackOut.push(num);
      }
    }
    if (!this.stackOut.length) {
      throw Error("Cannot dequeue from empty queue.");
    }
    return this.stackOut.pop();
  }
}

import { assertEquals, assertThrows } from "./deps.ts";

Deno.test("enqueues and dequeues correctly", () => {
  const queue = new Queue();
  queue.enqueue(1).enqueue(2).enqueue(3);
  const oldest = queue.dequeue();
  assertEquals(oldest, 1);
  const secondOldest = queue.dequeue();
  assertEquals(secondOldest, 2);
  const thirdOldest = queue.dequeue();
  assertEquals(thirdOldest, 3);
});

Deno.test("throws an error if dequeue is called on an empty queue", () => {
  const queue = new Queue();
  assertThrows(
    () => queue.dequeue(),
    Error,
    "Cannot dequeue from empty queue.",
  );
});
