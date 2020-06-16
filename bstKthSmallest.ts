interface Node {
  value: number;
  left: Node | null;
  right: Node | null;
}

function findBSTKthSmallestNumber(node: Node, k: number): number {
  const nums = [0, 0];
  inOrderTraversal(node, k, nums);
  return nums[1];
}

function inOrderTraversal(node: Node | null, k: number, nums: number[]) {
  if (!node) return;
  inOrderTraversal(node.left, k, nums);
  if (++nums[0] === k) { // ++nums[0] increments nums[0] as we traverse the tree
    nums[1] = node.value;
    return;
  }
  inOrderTraversal(node.right, k, nums);
}
