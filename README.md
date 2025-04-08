# Binary Search Tree Implementation

## Overview

This JavaScript implementation provides a complete Binary Search Tree (BST) with:

- Merge sort for initial array sorting
- Duplicate removal
- Balanced tree construction
- Standard BST operations
- Multiple traversal methods
- Balance checking and rebalancing

## Core Functions

### Merge Sort Implementation

```javascript
const split = (array) => {
  if (array.length <= 1) return array;
  const mid = Math.floor(array.length / 2);
  return sort(split(array.slice(0, mid)), split(array.slice(mid)));
};

const sort = (left, right) => {
  if (left.length === 0) return right;
  if (right.length === 0) return left;
  return left[0] < right[0]
    ? [left[0], ...sort(left.slice(1), right)]
    : [right[0], ...sort(left, right.slice(1))];
};
```

## Unique Elements Filter

```javascript
const uniq = (a) => a.filter((item, pos, ary) => !pos || item != ary[pos - 1]);
```

# BST Implementation

## Node Class

```javascript
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
```

## Tree Class Methods

### Tree Construction

```javascript
buildTree(array) {
  let sortedArray = split(array);
  let uniqueArray = uniq(sortedArray);
  const mid = Math.floor(uniqueArray.length / 2);
  this.root = new Node(uniqueArray[mid]);
  // ... builds balanced tree recursively
}
```

### Insertion

```javascript
insert(value, currentNode = this.root) {
  if (currentNode.data >= value) {
    currentNode.left
      ? this.insert(value, currentNode.left)
      : currentNode.left = new Node(value);
  } else {
    currentNode.right
      ? this.insert(value, currentNode.right)
      : currentNode.right = new Node(value);
  }
}
```

### Deletion

```javascript
deleteItem(value) {
  this.root = this.deleteNode(this.root, value);
}

deleteNode(node, value) {
  if (!node) return null;
  if (value < node.data) node.left = this.deleteNode(node.left, value);
  else if (value > node.data) node.right = this.deleteNode(node.right, value);
  else {
    if (!node.left && !node.right) return null;
    if (!node.left) return node.right;
    if (!node.right) return node.left;
    const successor = this.findMinNode(node.right);
    node.data = successor.data;
    node.right = this.deleteNode(node.right, successor.data);
  }
  return node;
}
```

# Traversal Methods

## Level-Order (BFS)

```javascript
levelOrder(callback) {
  let queue = [this.root];
  while (queue.length > 0) {
    let currentNode = queue.shift();
    callback(currentNode);
    if (currentNode.left) queue.push(currentNode.left);
    if (currentNode.right) queue.push(currentNode.right);
  }
}
```

## Depth-First Traversals

```javascript
inOrder(callback, node = this.root) {
  if (!node) return;
  this.inOrder(callback, node.left);
  callback(node);
  this.inOrder(callback, node.right);
}

preOrder(callback, node = this.root) {
  if (!node) return;
  callback(node);
  this.preOrder(callback, node.left);
  this.preOrder(callback, node.right);
}

postOrder(callback, node = this.root) {
  if (!node) return;
  this.postOrder(callback, node.left);
  this.postOrder(callback, node.right);
  callback(node);
}
```

# Utility Methods

## Tree Visualization

```javascript
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (!node) return;
  if (node.right)
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left)
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};
```

## Balance Management

```javascript
isBalanced() {
  const leftDepth = this.maxDepth(this.root.left);
  const rightDepth = this.maxDepth(this.root.right);
  return Math.abs(leftDepth - rightDepth) <= 1;
}

rebalance() {
  let orderedArray = [];
  this.inOrder(node => orderedArray.push(node.data));
  this.buildTree(orderedArray);
}
```

# Key Features

- Self-balancing construction
- O(n log n) sorting via merge sort
- Complete traversal implementations
- Visualization through prettyPrint
- Strict balance checking
