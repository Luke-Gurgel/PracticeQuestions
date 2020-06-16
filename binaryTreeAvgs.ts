/*
  Given a reference to the root node of a Binary Tree, return a list of averages
  by level/depth.

        4
       / \
      7   9
    /  \   \
  10    2   6

  output -> [4, 8, 6]
*/

class BinaryTreeNode {
  val: number;
  left: BinaryTreeNode | null = null;
  right: BinaryTreeNode | null = null;

  constructor(val: number) {
    this.val = val;
  }
}

function collectAverages(rootNode: BinaryTreeNode | null): number[] {
  if (!rootNode) return [];

  const averages: number[] = [];

  let currentLvl = 0;
  let currentLvlCount = 1;
  let currentLvlSum = rootNode.val;
  const queue: [BinaryTreeNode, number][] = [[rootNode, 0]];

  const storeAvg = () => {
    const avg = currentLvlSum / currentLvlCount;
    averages.push(avg);
  };

  const resetCurrentLvl = () => {
    currentLvl += 1;
    currentLvlSum = 0;
    currentLvlCount = 0;
  };

  while (queue.length) {
    const [node, lvl] = queue.pop() as [BinaryTreeNode, number];
    const isFirstLvl = lvl === 0;
    const isNextLvl = lvl !== currentLvl;

    if (isNextLvl || isFirstLvl) {
      storeAvg();
      resetCurrentLvl();
    }

    if (!isFirstLvl) {
      currentLvlCount += 1;
      currentLvlSum += node.val;
    }

    if (node.left) queue.unshift([node.left, lvl + 1]);
    if (node.right) queue.unshift([node.right, lvl + 1]);
  }

  storeAvg();

  return averages;
}

import { assertEquals } from "./deps.ts";

Deno.test("returns empty array if rootNode param is null", () => {
  const avgs = collectAverages(null);
  assertEquals(avgs, []);
});

Deno.test("returns list of averages by level/depth", () => {
  const rootNode = new BinaryTreeNode(4);
  rootNode.left = new BinaryTreeNode(7);
  rootNode.left.left = new BinaryTreeNode(10);
  rootNode.left.right = new BinaryTreeNode(2);
  rootNode.left.right.left = new BinaryTreeNode(3);
  rootNode.right = new BinaryTreeNode(9);
  rootNode.right.right = new BinaryTreeNode(6);
  rootNode.right.right.right = new BinaryTreeNode(7);

  const avgs = collectAverages(rootNode);
  assertEquals(avgs, [4, 8, 6, 5]);
});
