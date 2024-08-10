
// type QuestionNode = {
//   int id;
//   string question;
//   list[Answer] answersList;
// }

// type Answer = {
//   int id;
//   string answerText;
//   QuestionNode newQuestion;
// }

const decisionTree = {
    questionId: 1,
    question: "1+1=2?",
    answerList: [
      {
        answerId: 2,
        answerText: "Chuan roi",
        newQuestion: {
          questionId: 3,
          question: "Ngo nghinh",
          answerList: []
        }
      },
      { 
        answerId: 6,
        answerText: "Maybe dung maybe sai",
        newQuestion: {
          questionId: 7,
          question: "Chac chua",
          answerList: [
            {
              answerId: 8,
              answerText: "Chuan roi",
              newQuestion: {
                questionId: 9,
                question: "Ngo nghinh",
                answerList: []
              }
            },
            {
              answerId: 10,
              answerText: "Chuan roi",
              newQuestion: {
                questionId: 11,
                question: "Ngo nghinh",
                answerList: []
              }
            },
          ]
        }
      },
    ],
};

function generateUniqueId() {
    // Implement a unique ID generation logic
    return Date.now(); // A simple example, but consider using UUIDs for better uniqueness
}
  
function findQuestionNodeById(tree, nodeId) {
    if (tree.questionId === nodeId) {
      return tree;
    }
    for (const child of tree.answerList) {
      const foundNode = findQuestionNodeById(child.newQuestion, nodeId);
      if (foundNode) {
        return foundNode;
      }
    }
    return null;
}

function findAnswerNodeById(tree, nodeId) {
  for (const child of tree.answerList) {
    if (child.answerId === nodeId)
    {
      return child;
    }
    const foundNode = findAnswerNodeById(child.newQuestion, nodeId);
    if (foundNode) {
      return foundNode;
    }
  }
  return null;
}

function findQuestionNodeByAnswerId(tree, answerId) {
  if (tree.answerList.findIndex(item => item.answerId === answerId) >= 0)
    return tree;
  for (const child of tree.answerList) {
    const foundParent = findQuestionNodeByAnswerId(child.newQuestion, answerId);
    if (foundParent) {
      return foundParent;
    }
  }
  return null;
}


function addNewAnswerNode(tree, questionId, answerText ,nextQuestion) {
    const newNode = { answerId: generateUniqueId(), answerText, nextQuestion };
    const parentNode = findQuestionNodeById(tree, questionId);
    parentNode.answerList.push(newNode);
    return tree;
}


  

function editAnswerNode(tree, answerId, newAnswerText,newNextQuestion) {
    const node = findAnswerNodeById(tree, answerId);
    node.answerText = newAnswerText;
    node.newQuestion = newNextQuestion;
    return tree;
}

function editQuestionNode(tree, questionId, question) {
  const node = findQuestionNodeById(tree, questionId);
  node.question = question;
  return tree;
}

function deleteAnswerNode(tree, answerId) {
  const node = findQuestionNodeByAnswerId(tree, answerId);
  const index = node.answerList.findIndex(child => child.answerId === answerId);
  const copyTree = tree;
  copyTree.answerList.splice(index, 1);
  return copyTree;
}

// test function
addNewAnswerNode(decisionTree, 1, 'Yupp', {
  questionId: generateUniqueId(),
  question: "Qua met moi",
  answerList: []
})
editAnswerNode(decisionTree, 2, "Ngo cung dui", {
    questionId: generateUniqueId(),
    question: "Met moi lan 2",
    answerList: []
})
editQuestionNode(decisionTree, 1, "Alolo");


console.log(deleteAnswerNode(decisionTree,2))
  
  