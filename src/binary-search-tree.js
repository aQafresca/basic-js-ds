const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this._root = null;
  }
  
  root() {
  return this._root;
  }

  add(data) {
    this._root = insertIntoBTS(this._root, data)

    function insertIntoBTS(node, data) {
      if (!node) return new Node(data)
      if (node.data === data) return node;
  
      if (data < node.data) {
        node.left = insertIntoBTS(node.left, data)
      } else {
        node.right = insertIntoBTS(node.right, data)
      }
      return node;
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let current = this._root;
    while (current) {
      if (current.data === data) {
        return current;
      }

      current = data < current.data ? current.left : current.right;
    }
    return null;
  }

  remove(data) {
    this._root = removeFromBTS(this._root, data)

    function removeFromBTS(node, data) {
      if (!node) return null;

      if (data < node.data) {
        node.left = removeFromBTS(node.left, data)
      } else if (data > node.data) {
        node.right = removeFromBTS(node.right, data)
      } else {
        if (!node.left && !node.right) {
        return null;
        }

        if (!node.left) {
          return node.right;
        }
        if(!node.right) {
          return node.left;
        }
        let maxFromLeft = node.left;
        while (maxFromLeft.right) {
          maxFromLeft = maxFromLeft.right;
        }
        node.data = maxFromLeft.data;
        node.left = removeFromBTS(node.left, maxFromLeft.data);
      }
      return node;
    }
  }

  min() {
    return findMin(this._root)

    function findMin(node) {
      if (!node) return null;

      while (node.left) {
        node = node.left;
      }
      return node.data
    }
  }


  max() {
    return findMax(this._root);

    function findMax(node) {
      if (!node) return null;

      while (node.right) {
        node = node.right;
      }
      return node.data
    }
  }
}

module.exports = {
  BinarySearchTree
};