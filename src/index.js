import { curry } from "prelude-ls";
import "./styles.css";

// Merge sort and
const split = (array) => {
  if (array.length <= 1) {
    return array;
  }

  // Split the array into two halves
  const mid = Math.floor(array.length / 2);
  const leftHalf = split(array.slice(0, mid)); // Left half of the array
  const rightHalf = split(array.slice(mid)); // Right half of the array

  // Recursively merge the two sorted halves
  return sort(leftHalf, rightHalf);
};

const sort = (left, right) => {
  // edge cases where arrays are uneven, taking care of scenarios where one side would be an empty array
  if (left.length === 0) {
    return right;
  }
  if (right.length === 0) {
    return left;
  }

  if (left[0] < right[0]) {
    // remove smaller left value from left array
    // keep iterating till left is no longer smaller than right
    return [left[0], ...sort(left.slice(1), right)];
  } else {
    // remove smaller right value from right array
    // keep iterating till right is no longer smaller than left
    return [right[0], ...sort(left, right.slice(1))];
  }
};

const uniq = (a) => {
  return a.filter(function (item, pos, ary) {
    return !pos || item != ary[pos - 1];
  });
};

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  insert(value, currentNode = this.root) {
    // check if value is smaller than node value
    if (currentNode.data >= value) {
      // if left subtree is taken, traverse through the left tree
      //  if left node is empty, set value to that node
      if (currentNode.left != null) {
        return this.insert(value, currentNode.left);
      } else {
        currentNode.left = new Node(value);
        return;
      }
    }

    if (currentNode.data <= value) {
      // if right subtree is taken, traverse through the right tree
      //  if right node is empty, set value to that node
      if (currentNode.right != null) {
        return this.insert(value, currentNode.right);
      } else {
        currentNode.right = new Node(value);
        return;
      }
    }
  }

  buildTree(array) {
    // sort array
    let sortedArray = split(array);
    // remove duplicates
    let uniqueArray = uniq(sortedArray);

    const mid = Math.floor(uniqueArray.length / 2);

    const root = new Node(uniqueArray[mid]);
    this.root = root;

    let leftHalf = split(uniqueArray.slice(0, mid)); // Left half of the array
    let rightHalf = split(uniqueArray.slice(mid + 1)); // Right half of the array

    while (leftHalf.length > 0 || rightHalf.length > 0) {
      // find middle, append to tree, remove appended value from array
      if (leftHalf.length > 0) {
        const mid = Math.floor(leftHalf.length / 2);
        this.insert(leftHalf[mid]);
        leftHalf.splice(mid, 1);
      }

      if (rightHalf.length > 0) {
        const mid = Math.floor(rightHalf.length / 2);
        this.insert(rightHalf[mid]);
        rightHalf.splice(mid, 1);
      }
    }
  }

  deleteItem(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(node, value) {
    if (node === null) return null;

    // Traverse left/right to find the node
    if (value < node.data) {
      node.left = this.deleteNode(node.left, value);
    } else if (value > node.data) {
      node.right = this.deleteNode(node.right, value);
    } else {
      // Case 1: No children (leaf node)
      if (node.left === null && node.right === null) {
        return null;
      }
      // Case 2: One child
      if (node.left === null) {
        return node.right;
      }
      if (node.right === null) {
        return node.left;
      }
      // Case 3: Two children
      const successor = this.findMinNode(node.right);
      node.data = successor.data;
      node.right = this.deleteNode(node.right, successor.data);
    }
    return node;
  }

  findMinNode(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  find(value, currentNode = this.root) {
    if (currentNode === null) {
      return null;
    }

    if (value === currentNode.data) {
      return currentNode;
    }

    if (currentNode.data > value) {
      return this.find(value, currentNode.left);
    }

    if (currentNode.data < value) {
      return this.find(value, currentNode.right);
    }
  }

  levelOrder(callback) {
    // queue based solution that stores nodes in level order
    // left lvl 1 -> right lvl 1 -> leftleft lvl 2 -> leftright lvl 2
    let queue = [];
    // root
    queue.push(this.root);

    while (queue.length > 0) {
      // pop and return the current node
      let currentNode = queue.shift();
      callback(currentNode);
      if (currentNode.left != null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right != null) {
        queue.push(currentNode.right);
      }
    }

    return;
  }

  inOrder(callback, currentNode = this.root) {
    if (currentNode === null) {
      return;
    }

    this.inOrder(callback, currentNode.left);
    callback(currentNode);
    this.inOrder(callback, currentNode.right);
  }

  preOrder(callback, currentNode = this.root) {
    if (currentNode === null) {
      return;
    }

    callback(currentNode);
    this.preOrder(callback, currentNode.left);
    this.preOrder(callback, currentNode.right);
  }

  postOrder(callback, currentNode = this.root) {
    if (currentNode === null) {
      return;
    }

    this.postOrder(callback, currentNode.left);
    this.postOrder(callback, currentNode.right);
    callback(currentNode);
  }

  height(value, currentNode = this.root, count = 1) {
    if (currentNode === null) {
      return null;
    }

    if (currentNode.data === value) {
      return count;
    }

    if (currentNode.data > value) {
      count += 1;
      return this.height(value, currentNode.left, count);
    }

    if (currentNode.data < value) {
      count += 1;
      return this.height(value, currentNode.right, count);
    }
  }

  depth(value, currentNode = this.root) {
    const height = this.height(value) - 1;
    return height;
  }

  maxDepth(root) {
    // Base case: if the tree is empty, return 0
    if (root == null) {
      return 0;
    }

    // Recursively find the maximum depth of the left and right subtrees
    let leftDepth = this.maxDepth(root.left);
    let rightDepth = this.maxDepth(root.right);

    // The maximum depth is the greater of the two depths plus one for the current node
    return Math.max(leftDepth, rightDepth) + 1;
  }

  isBalanced() {
    // compare depth of left and right subtree
    const leftDepth = this.maxDepth(this.root.left);
    const rightDepth = this.maxDepth(this.root.right);
    if (Math.abs(leftDepth - rightDepth) >= 2) {
      return false;
    }

    let currentNode = this.root;

    // check tree weight balance
    const subtreeLeft = (node) => {
      if (node === null) {
        return null;
      }
      while (node != null) {
        if (node.right != null) {
          return false;
        }
        node = node.left;
      }
    };

    const subtreeRight = (node) => {
      if (node === null) {
        return null;
      }
      while (node != null) {
        if (node.left != null) {
          return false;
        }
        node = node.right;
      }
    };

    const leftTreeLeft = subtreeLeft(currentNode.left.left);
    const leftTreeRight = subtreeRight(currentNode.left.right);
    const rightTreeLeft = subtreeLeft(currentNode.right.left);
    const rightTreeRight = subtreeRight(currentNode.right.right);

    if (
      leftTreeLeft === false ||
      leftTreeRight === false ||
      rightTreeLeft === false ||
      rightTreeRight === false
    ) {
      return false;
    }

    return true;
  }

  rebalance() {
    let orderedArray = [];
    this.inOrder((object) => {
      orderedArray.push(object.data);
    });

    this.buildTree(orderedArray);
  }
}

// draw BST
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// generate randomised array
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

let randArray = [];
for (let index = 0; index < 16; index++) {
  const randInt = getRandomInt(0, 100);
  randArray.push(randInt);
}

// build tree
let tree = new Tree();
tree.buildTree(randArray);
prettyPrint(tree.root);

console.log("is balanced:", tree.isBalanced());

// preorder
let preArray = [];
tree.preOrder((object) => {
  preArray.push(object.data);
});
console.log("preorder:", preArray);

// postorder
let postArray = [];
tree.postOrder((object) => {
  postArray.push(object.data);
});
console.log("postorder:", postArray);

// postorder
let inArray = [];
tree.inOrder((object) => {
  inArray.push(object.data);
});
console.log("inorder:", inArray);

// Unbalance tree
for (let index = 0; index < 13; index++) {
  const randInt = getRandomInt(0, 100);
  tree.insert(randInt);
}
console.log("is balanced:", tree.isBalanced());
prettyPrint(tree.root);

// rebalance tree
tree.rebalance();
prettyPrint(tree.root);
console.log("is balanced:", tree.isBalanced());

// preorder
let preArray1 = [];
tree.preOrder((object) => {
  preArray1.push(object.data);
});
console.log("preorder:", preArray1);

// postorder
let postArray1 = [];
tree.postOrder((object) => {
  postArray1.push(object.data);
});
console.log("postorder:", postArray1);

// postorder
let inArray1 = [];
tree.inOrder((object) => {
  inArray1.push(object.data);
});
console.log("inorder:", inArray1);
