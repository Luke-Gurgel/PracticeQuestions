class BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  root: BSTNode;

  constructor(value: number) {
    this.root = new BSTNode(value);
  }

  public insert(value: number): BinarySearchTree {
    let node = this.root;

    while (true) {
      if (value > node.value) {
        if (node.right) {
          node = node.right;
        } else {
          node.right = new BSTNode(value);
          break;
        }
      } else if (value < node.value) {
        if (node.left) {
          node = node.left;
        } else {
          node.left = new BSTNode(value);
          break;
        }
      } else {
        break;
      }
    }

    return this;
  }

  public find(value: number): boolean {
    let node = this.root;
    return false;
  }
}
