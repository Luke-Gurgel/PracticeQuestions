/* Singly Linked List implementation */

export class LinkedListNode {
  value: number;
  next?: LinkedListNode;

  constructor(value: number) {
    this.value = value;
  }
}

export default class LinkedList {
  head?: LinkedListNode;
  tail?: LinkedListNode;
  private size: number;

  constructor() {
    this.size = 0;
  }

  public append(value: number): void {
    const newTailNode = new LinkedListNode(value);

    if (!this.head) {
      this.head = this.tail = newTailNode;
      return;
    }

    this.tail!.next = newTailNode;
    this.tail = newTailNode;
    this.size += 1;
  }

  public removeHead(): LinkedListNode | undefined {
    if (!this.head) return;
    const removedHead = this.head;
    this.head = removedHead.next;
    if (this.size <= 2) this.tail = this.head;
    this.size -= 1;
    return removedHead;
  }

  public get length(): number {
    return this.size;
  }

  public get isEmpty(): boolean {
    return this.size === 0;
  }

  public print(): void {
    if (this.isEmpty) return console.log("List is empty.");

    let iteratorNode = this.head;
    let str = "";

    while (iteratorNode) {
      str += ` ${iteratorNode.value} =>`;
      iteratorNode = iteratorNode.next;
    }

    str += " null";
    console.log(str.trim());
  }
}
