class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(){
        this.root = null;
    }

    buildTree(array, start, end){
        if (start > end){
            return null;
        } 
        const mid = parseInt((start + end) / 2);
        let root = new Node(array[mid]);
        root.left = this.buildTree(array, start, mid - 1);
        root.right = this.buildTree(array, mid + 1, end);
        return root;
    }

    insert(value, root){
        if (root.left === null && value < root.data){
            root.left = new Node(value);
            return 
        }
        if (root.right === null && value > root.data){
            root.right = new Node(value);
            return
        }
        if (value < root.data){
            this.insert(value, root.left);
        }
        else if (value > root.data){
            this.insert(value, root.right);
        } 
    }

    printTree(node, prefix = '', isLeft = true){
        if (node === null) {
           return;
        }
        if (node.right !== null) {
          this.printTree(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
          this.printTree(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
      }
}

const tree = new Tree();
const root = tree.buildTree([1,5,6,9,20], 0, 4);
tree.insert(7, root);
tree.insert(2, root);
tree.insert(25, root);
tree.printTree(root);