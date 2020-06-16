/* Questions: write a fn that accepts a a referene to the root node of a BST and returns
true if the tree conforms to the 3 principles of a BST, and false otherwise */

class Node {
  value: number;
  left: Node | null;
  right: Node | null;

  constructor(value: number) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

function isValidBST(node: Node | null): boolean {
  if (!node) return true;

  if (node.left && node.left.value >= node.value) return false;
  if (node.right && node.right.value < node.value) return false;

  return isValidBST(node.left) && isValidBST(node.right);
}

/* Tests */

import { assertEquals } from "./deps.ts";

Deno.test("isValidBST returns true for valid BST", () => {
  const root = new Node(2);
  root.left = new Node(1);
  root.right = new Node(3);
  assertEquals(isValidBST(root), true);
});

Deno.test("isValidBST returns true for valid BST", () => {
  const root = new Node(5);
  root.left = new Node(1);
  root.right = new Node(4);
  root.right.left = new Node(3);
  root.right.right = new Node(6);
  assertEquals(isValidBST(root), false);
});
