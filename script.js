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
        if (root === null){
            root = new Node(value);
            return root;
        }
        if (value < root.data){
            root.left = this.insert(value, root.left);
        }
        else if (value > root.data){
            root.right = this.insert(value, root.right);
        }
        return root; 
    }

    delete(value, root){
        if (root.data === value){
            if (root.left === null){
                return root.right;
            }
            else if (root.right === null){
                return root.left;
            }
            else{
                root.data = this.minRightValue(root.right);
                root.right = this.delete(root.data, root.right);
                return root;
            }
        }
        if (value < root.data){
            root.left = this.delete(value, root.left);
        }
        else if (value > root.data){
            root.right = this.delete(value, root.right);
        }
        return root;
    }

    minRightValue(root){
        if (root.left === null){
            return root.data;
        }
        else if (root.left){
            return this.minRightValue(root.left);
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
tree.delete(25, root);
tree.printTree(root);
tree.delete(1, root);
tree.printTree(root);
tree.delete(5, root);
tree.printTree(root);
tree.delete(9, root);
tree.printTree(root);
tree.delete(6, root);
tree.printTree(root);