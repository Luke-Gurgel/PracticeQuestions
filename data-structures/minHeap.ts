/* Implementation */

class MinHeap {
  public heap: number[];

  constructor(array: number[]) {
    this.heap = array;
    this.arrangeHeap();
  }

  get lastIdx() {
    return this.heap.length - 1;
  }

  arrangeHeap() {
    const firstParentIdx = this.getParentIdx(this.lastIdx);
    for (let i = firstParentIdx; i >= 0; i--) {
      this.siftDown(i);
    }
  }

  remove() {
    if (this.heap.length) {
      this.swap(0, this.lastIdx);
      const val = this.heap.pop();
      this.siftDown();
      return val;
    }
  }

  insert(value: number) {
    this.heap.push(value);
    if (this.heap.length > 1) {
      this.siftUp(this.lastIdx);
    }
  }

  peek() {
    if (this.heap.length) {
      return this.heap[0];
    }
  }

  siftDown(i = 0) {
    if (!this.isWithinBounds(i)) return;

    const leftIdx = this.getChildIdx(i);
    const rightIdx = this.getChildIdx(i, 2);

    const node = this.heap[i];
    const leftChild = this.getChild(leftIdx);
    const rightChild = this.getChild(rightIdx);

    if (leftChild !== null) {
      const { child, idx } = this.getSmallestChild(
        leftIdx,
        rightIdx,
        leftChild,
        rightChild || Infinity,
      );

      if (node > child) {
        this.swap(i, idx);
        this.siftDown(idx);
      }
    }
  }

  siftUp(i: number) {
    if (!this.isWithinBounds(i)) return;

    const parentIdx = this.getParentIdx(i);
    const parent = this.heap[parentIdx];
    const child = this.heap[i];

    if (parent > child) {
      this.swap(i, parentIdx);
      this.siftUp(parentIdx);
    }
  }

  getParentIdx(i: number) {
    return Math.floor((i - 1) / 2);
  }

  getChildIdx(i: number, child = 1) {
    return (2 * i) + child;
  }

  getChild(i: number) {
    return this.isWithinBounds(i) ? this.heap[i] : null;
  }

  getSmallestChild(
    leftIdx: number,
    rightIdx: number,
    leftChild: number,
    rightChild: number,
  ) {
    return leftChild < rightChild
      ? { child: leftChild, idx: leftIdx }
      : { child: rightChild, idx: rightIdx };
  }

  swap(i: number, j: number) {
    const tmp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = tmp;
  }

  isWithinBounds(i: number) {
    return i >= 0 && i <= this.lastIdx;
  }
}

/* Tests */

import { assertEquals } from "../deps.ts";

function satisfiesMinHeapProp(heap: number[]): boolean {
  for (let i = 1; i < heap.length; i++) {
    const parentIdx = Math.floor((i - 1) / 2);
    if (heap[parentIdx] > heap[i]) return false;
  }
  return true;
}

Deno.test("buildHeap method", () => {
  const arr = [6, 3, 13, 4, 2, 5, 9, 15, 21];
  const minHeap = new MinHeap(arr);
  assertEquals(minHeap.peek(), 2);
  assertEquals(satisfiesMinHeapProp(minHeap.heap), true);
});

Deno.test("insert method", () => {
  const minHeap = new MinHeap([]);
  minHeap.insert(3);
  minHeap.insert(5);
  minHeap.insert(8);
  minHeap.insert(2);
  minHeap.insert(4);
  assertEquals(minHeap.peek(), 2);
});

Deno.test("remove method", () => {
  const minHeap = new MinHeap([]);
  minHeap.insert(3);
  minHeap.insert(5);
  minHeap.insert(8);
  minHeap.insert(2);
  minHeap.insert(4);
  minHeap.remove();
  assertEquals(minHeap.peek(), 3);
  minHeap.remove();
  assertEquals(minHeap.peek(), 4);
});

Deno.test("Methods combined", () => {
  const arr = [48, 12, 24, 7, 8, -5, 24, 391, 24, 56, 2, 6, 8, 41];
  const minHeap = new MinHeap(arr);
  minHeap.insert(76);
  assertEquals(satisfiesMinHeapProp(minHeap.heap), true);
  assertEquals(minHeap.peek(), -5);
  assertEquals(minHeap.remove(), -5);
  assertEquals(satisfiesMinHeapProp(minHeap.heap), true);
  assertEquals(minHeap.peek(), 2);
  assertEquals(minHeap.remove(), 2);
  assertEquals(satisfiesMinHeapProp(minHeap.heap), true);
  assertEquals(minHeap.peek(), 6);
  minHeap.insert(87);
  assertEquals(satisfiesMinHeapProp(minHeap.heap), true);
});
