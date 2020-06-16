/*
Question: the car manufacturer Honda holds their distribution system in the form of a tree (not necessarily binary). The root is the company itself, and every node in the tree represents a car distributor that receives cars from the parent node and ships them to its children nodes. The leaf nodes are car dealerships that sell cars direct to consumers. In addition, every node holds an integer that is the cost of shipping a car to it.
*/

/* Implementation: DFS approach */

class PathNode {
  cost: number;
  children: PathNode[];

  constructor(cost: number) {
    this.cost = cost;
    this.children = [];
  }
}

function getCheapestSalesPath(node: PathNode, runningCost = 0) {
  if (!node.children.length) {
    return runningCost + node.cost;
  }

  let lowestCost = Infinity;
  for (const child of node.children) {
    let pathCost = getCheapestSalesPath(child, runningCost + node.cost);
    lowestCost = Math.min(pathCost, lowestCost);
  }

  return lowestCost;
}

// deno run --inspect salesPath.ts

const zero = new PathNode(0);
const five = new PathNode(5);
const three = new PathNode(3);
const six = new PathNode(6);
const four = new PathNode(4);
const two = new PathNode(2);
const zero2 = new PathNode(0);
const one = new PathNode(1);
const five2 = new PathNode(5);
const one2 = new PathNode(1);
const ten = new PathNode(10);
const one3 = new PathNode(1);

zero.children = [five, three, six];
five.children = [four];
three.children = [two, zero2];
six.children = [one, five2];
four.children = [];
two.children = [one2];
zero2.children = [ten];
one.children = [];
five2.children = [];
one2.children = [one3];
ten.children = [];
one3.children = [];

getCheapestSalesPath(zero);

/* Tests */

import { assertEquals } from "./deps.ts";

Deno.test("getCheapestSalesPath", () => {
  const zero = new PathNode(0);
  const five = new PathNode(5);
  const three = new PathNode(3);
  const six = new PathNode(6);
  const four = new PathNode(4);
  const two = new PathNode(2);
  const zero2 = new PathNode(0);
  const one = new PathNode(1);
  const five2 = new PathNode(5);
  const one2 = new PathNode(1);
  const ten = new PathNode(10);
  const one3 = new PathNode(1);

  zero.children = [five, three, six];
  five.children = [four];
  three.children = [two, zero2];
  six.children = [one, five2];
  four.children = [];
  two.children = [one2];
  zero2.children = [ten];
  one.children = [];
  five2.children = [];
  one2.children = [one3];
  ten.children = [];
  one3.children = [];

  const root = zero;
  assertEquals(getCheapestSalesPath(root), 7);
});
