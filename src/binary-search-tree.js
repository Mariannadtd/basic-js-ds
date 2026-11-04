const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);

    if (this.rootNode === null) {
      this.rootNode = newNode;
      return;
    }

    let current = this.rootNode;

    while (current !== null) {
      if (data === current.data) {
        return;
      }

      if (data < current.data) {
        if (current.left === null) {
          current.left = newNode;
          return;
        }

        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return;
        }

        current = current.right;
      }
    }
  }

  find(data) {
    let current = this.rootNode;

    while (current !== null) {
      if (data === current.data) {
        return current;
      }

      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return null;
  }

  has(data) {
    return this.find(data) !== null;
  }

  remove(data) {
    this.rootNode = this.removeNode(this.rootNode, data);
  }

  removeNode(node, data) {
    if (node === null) {
      return null;
    }

    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    }

    if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
    }

    if (node.left === null && node.right === null) {
      return null;
    }

    if (node.left === null) {
      return node.right;
    }

    if (node.right === null) {
      return node.left;
    }

    const successor = this.findMinNode(node.right);

    node.data = successor.data;
    node.right = this.removeNode(node.right, successor.data);

    return node;
  }

  findMinNode(node) {
    let current = node;

    while (current !== null && current.left !== null) {
      current = current.left;
    }

    return current;
  }

  min() {
    const node = this.findMinNode(this.rootNode);

    if (node === null) {
      return null;
    }

    return node.data;
  }

  max() {
    let current = this.rootNode;

    if (current === null) {
      return null;
    }

    while (current.right !== null) {
      current = current.right;
    }

    return current.data;
  }
}

module.exports = {
  BinarySearchTree,
};
