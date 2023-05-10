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
        this.root = root;
        return this.root;
    }

    insert(value, root = this.root){
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

    delete(value, root = this.root){
        if (root === null)
            return root;
        if (root.data === value){
            if (root.left === null){
                return root.right;
            }
            else if (root.right === null){
                return root.left;
            }
            else{
                root.data = this.minValue(root.right);
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

    minValue(root = this.root){
        if (root.left === null){
            return root.data;
        }
        else if (root.left){
            return this.minValue(root.left);
        }
    }

    find(value, root = this.root){
        if (root === null || value === root.data){
            return root;
        }
        else if (value < root.data){
            return this.find(value, root.left);
        }
        else if (value > root.data){
            return this.find(value, root.right);
        }
    }

    levelOrderTraversal(root = this.root){
        if (root === null){
            return
        }
        let queue = [];
        let array = [];
        queue.push(root);
        while (queue.length !== 0){
            array.push(queue[0].data);
            if (queue[0].left !== null){
                queue.push(queue[0].left)
            }
            if (queue[0].right !== null){
                queue.push(queue[0].right)
            }
            queue.shift();
        }
        return array;
    }

    inOrderTraversal(root = this.root){
        let array = [];
        function inOrder(root){
            if (root === null){
                return
            }
            inOrder(root.left);
            array.push(root.data);
            inOrder(root.right);
        }
        inOrder(root);
        return array;
    }

    preOrderTraversal(root = this.root){
        let array = [];
        function preOrder(root){
            if (root === null){
                return
            }
            array.push(root.data);
            preOrder(root.left);
            preOrder(root.right);
        }
        preOrder(root);
        return array;
    }

    postOrderTraversal(root = this.root){
        let array = [];
        function postOrder(root){
            if (root === null){
                return
            }
            postOrder(root.left);
            postOrder(root.right);
            array.push(root.data);
        }
        postOrder(root);
        return array;
    }

    height(root = this.root){
        if(root === null){
            return -1;
        }
        return Math.max(this.height(root.left), this.height(root.right)) + 1;
    }

    nodeHeight(value, root = this.root){
        let height;
        function findHeight(root, value){
            if (root === null){
                return -1;
            }
            let leftHeight = findHeight(root.left, value);
            let rightHeight = findHeight(root.right, value);
            let taller = Math.max(leftHeight, rightHeight) + 1;
            if (root.data === value){
                height = taller;
            }
            return taller;
        }
        findHeight(root, value)
        return height;
    }

    nodeDepth(value, root = this.root){
        if (root === null){
            return -1;
        }
        let dist = -1;
        if (root.data === value){
            return dist + 1;
        }
        if ((dist = this.nodeDepth(value, root.left)) >= 0){
            return dist + 1;
        }
        if ((dist = this.nodeDepth(value, root.right)) >= 0){
            return dist + 1;
        }
        return dist;
    }

    isBalanced(root = this.root){
        if (root === null){
            return;
        }
        let leftHeight = this.height(root.left);
        let rightHeight = this.height(root.right);
        if (leftHeight - rightHeight > 1 || rightHeight - leftHeight > 1){
            return false;
        }
        if (this.isBalanced(root.left) === false){
            return false;
        }
        if (this.isBalanced(root.right) === false){
            return false;
        }
        return true;
    }

    rebalance(root = this.root){
        let inOrderArray = this.inOrderTraversal(root);
        return this.buildTree(inOrderArray, 0, inOrderArray.length - 1);
    }

    printTree(root = this.root, prefix = '', isLeft = true){
        if (root === null) {
           return;
        }
        if (root.right !== null) {
          this.printTree(root.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${root.data}`);
        if (root.left !== null) {
          this.printTree(root.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
      }
}

const tree = new Tree();
tree.buildTree([1,4,6,9,20], 0, 4);
tree.printTree();
console.log("Is tree balanced?", tree.isBalanced());
console.log("InOrder:", tree.inOrderTraversal());
console.log("PreOrder:", tree.preOrderTraversal());
console.log("PostOrder:", tree.postOrderTraversal());
console.log("LevelOrder:", tree.levelOrderTraversal());
tree.insert(22);
tree.insert(25);
tree.printTree();
console.log("Is tree balanced?", tree.isBalanced());
console.log(tree.root)
tree.rebalance();
console.log(tree.root)
tree.printTree();
tree.delete(9)
tree.printTree();
console.log(tree.root)
console.log("Is tree balanced?", tree.isBalanced());
console.log("InOrder:", tree.inOrderTraversal());
console.log("PreOrder:", tree.preOrderTraversal());
console.log("PostOrder:", tree.postOrderTraversal());
console.log("LevelOrder:", tree.levelOrderTraversal());
