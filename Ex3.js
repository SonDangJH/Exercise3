const decisionTree = {
    id: 1,
    question: "1+1=2?",
    children: [
      {
        id: 2,
        question: "2+2=4?",
        children: [
          { id: 3, question: "2+2=2*2", children: [] },
          { id: 4, question: "2+2=5?", children: [] },
        ],
      },
      { id: 5, question: "1+1=5?", children: [] },
    ],
};

function generateUniqueId() {
    // Implement a unique ID generation logic
    return Date.now(); // A simple example, but consider using UUIDs for better uniqueness
}
  
function findNodeById(tree, nodeId) {
    if (tree.id === nodeId) {
      return tree;
    }
    for (const child of tree.children) {
      const foundNode = findNodeById(child, nodeId);
      if (foundNode) {
        return foundNode;
      }
    }
    return null;
}
  
function findParentNode(tree, nodeId) {
    for (const child of tree.children) {
      if (child.id === nodeId) {
        return tree;
      }
      const foundParent = findParentNode(child, nodeId);
      if (foundParent) {
        return foundParent;
      }
    }
    return null;
}

function addNode(tree, parentId, question) {
    const newNode = { id: generateUniqueId(), question, children: [] };
    const parentNode = findNodeById(tree, parentId);
    parentNode.children.push(newNode);
    return tree;
}
  

function editNode(tree, nodeId, newQuestion) {
    const node = findNodeById(tree, nodeId);
    node.question = newQuestion;
    return tree;
}

function deleteNode(tree, nodeId) {
    const parentNode = findParentNode(tree, nodeId);
    const index = parentNode.children.findIndex(child => child.id === nodeId);
    const copyNode = parentNode.children.slice(index, 1);
    return copyNode;
}

  
  