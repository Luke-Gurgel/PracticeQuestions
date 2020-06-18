import LinkedList, { LinkedListNode } from "./singlyLinkedList.ts";

export default class Queue {
  private linkedList: LinkedList;

  constructor() {
    this.linkedList = new LinkedList();
  }

  isEmpty(): boolean {
    return !this.linkedList.head;
  }

  peek(): LinkedListNode | undefined {
    return this.linkedList.head;
  }

  enqueue(value: number) {
    this.linkedList.append(value);
  }

  dequeue(): LinkedListNode | undefined {
    return this.linkedList.removeHead();
  }
}
