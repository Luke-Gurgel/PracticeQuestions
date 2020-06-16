/* Question: write a fn that determines if a linked list is cyclic */

/* Implementation using extra space -> Time: O(N) | Space: O(N) */

import { LinkedListNode } from "./data-structures/singly_linked_list.ts";

function isLinkedListCyclic(head?: LinkedListNode): boolean {
  const visited = new Set<LinkedListNode>();
  for (let node = head; node !== undefined; node = node?.next) {
    if (visited.has(node)) return true;
    visited.add(node);
  }
  return false;
}

/* Implementation using Floyd's algorithm -> Time: O(N) | Space: O(1) */

function isLLCyclic(head?: LinkedListNode): boolean {
  let slow = head, fast = head?.next;
  while (slow && fast) {
    if (slow === fast) return true;
    slow = slow.next;
    fast = fast.next?.next;
  }
  return false;
}

/* Tests */

import { assertEquals } from "./deps.ts";

Deno.test("undefined head node", () => {
  assertEquals(isLLCyclic(undefined), false);
  assertEquals(isLinkedListCyclic(undefined), false);
});

Deno.test("single head node w/o cycle", () => {
  const node = new LinkedListNode(1);
  assertEquals(isLLCyclic(node), false);
  assertEquals(isLinkedListCyclic(node), false);
});

Deno.test("single head node w/ cycle", () => {
  const node = new LinkedListNode(1);
  node.next = node;
  assertEquals(isLLCyclic(node), true);
  assertEquals(isLinkedListCyclic(node), true);
});

Deno.test("multiple nodes w/o cycle", () => {
  const node = new LinkedListNode(1);
  node.next = new LinkedListNode(2);
  node.next.next = new LinkedListNode(3);
  assertEquals(isLLCyclic(node), false);
  assertEquals(isLinkedListCyclic(node), false);
});

Deno.test("multiple nodes w/ cycle", () => {
  const node = new LinkedListNode(1);
  node.next = new LinkedListNode(2);
  node.next.next = new LinkedListNode(3);
  node.next.next.next = node;
  assertEquals(isLLCyclic(node), true);
  assertEquals(isLinkedListCyclic(node), true);
});
