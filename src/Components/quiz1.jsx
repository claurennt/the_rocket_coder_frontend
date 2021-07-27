export const quiz1 = {
  quizTitle: "Welcome to the RoboQuiz",
  quizSynopsis:
    "This quiz is designed for you to refresh your coding skills and help you on your journey to becoming a Rocket Coder 🚀",
  questions: [
    {
      question:
        "How can you access the state of a component from inside of a member function?",
      questionType: "text",// if you need to display Picture in Question
      answerSelectionType: "single",
      answers: [
        "this.getState()",
        "this.prototype.stateValue",
        "this.state",
        "this.values",
      ],
      correctAnswer: "3",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. ",
      explanation:
        "The state is a data structure that starts with a default value when a Component mounts. It may be mutated across time, mostly as a result of user events.",
      point: "20",
    },
    {
      question: "ReactJS is developed by _____?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["Google Engineers", "Facebook Engineers"],
      correctAnswer: "2",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "The origins of this highly acclaimed technology started at Facebook. They concentrated in making React JS available and presenting it to the world as a JavaScript library to build user interfaces (UI). The responsible for this was Jordan Walke, who developed it and named it “FaxSJ”. Facebook then decided to use it with the purpose of improving and optimizing its own mobile app.",
      point: "20",
    },
    {
      question: "ReactJS is an MVC based framework?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["True", "False"],
      correctAnswer: "2",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. ",
      explanation:
        "React isn't an MVC framework. React is a library for building composable user interfaces. It encourages the creation of reusable UI components which present data that changes over time.",
      point: "20",
    },
    {
      question: "Which of the following concepts is/are key to ReactJS?",
      questionType: "text",
      answerSelectionType: "single",
      answers: [
        "Component-oriented design",
        "Event delegation model",
        "Both of the above",
      ],
      correctAnswer: "3",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer.",
      explanation:
        "React doesn't actually attach event handlers to the nodes themselves. When React starts up, it starts listening for all events at the top level using a single event listener",
      point: "20",
    },
    {
      question: "What are the advantages of React JS?",
      questionType: "text",
      answerSelectionType: "multiple",
      answers: [
        "React can be used on client and as well as server side too",
        "Using React increases readability and makes maintainability easier. Component, Data patterns improves readability and thus makes it easier for manitaining larger apps",
        "React components have lifecycle events that fall into State/Property Updates",
        "React can be used with any other framework (Backbone.js, Angular.js) as it is only a view layer",
      ],
      correctAnswer: [1, 2, 4],
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer.",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "20",
    },
      {
      question:
        "Arbitrary inputs of components are called __________.",
      questionType: "text",
       // if you need to display Picture in Question
      answerSelectionType: "single",
      answers: [
        "Keys",
        "Props",
        "Elements",
        "Ref",
      ],
      correctAnswer: "2",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer.",
      explanation:
        "Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called props) and return React elements describing what should appear on the screen.",
      point: "20",
    },
    {
      question:
        "_________ can be done while more than one element needs to be returned from a component.",
      questionType: "text",
       // if you need to display Picture in Question
      answerSelectionType: "single",
      answers: [
        "Abstraction",
        "Packing",
        "Insultation",
        "Wrapping",
      ],
      correctAnswer: "4",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer.",
      point: "20",
    },
     {
      question: "Which of the following needs to be updated to achieve dynamic UI updates?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["State", "Props"],
      correctAnswer: "1",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer.",
      explanation:
        "State is a plain JavaScript object used by React to represent an information about the component's current situation. It's managed in the component (just like any variable declared in a function).",
      point: "20",
    },
        {
      question:
        "In JSX most of the errors can be caught during _________.",
      questionType: "text",
       // if you need to display Picture in Question
      answerSelectionType: "single",
      answers: [
        "Interpretation",
        "Execution",
        "Compilation",
        "Build",
      ],
      correctAnswer: "3",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer.",
      explanation:"Compilation error refers to a state when a compiler fails to compile a piece of computer program source code, either due to errors in the code, or, more unusually, due to errors in the compiler itself. A compilation error message often helps programmers debugging the source code.",
      point: "20",
    },
            {
      question:
        "What is the smallest building block of ReactJS?",
      questionType: "text",
       // if you need to display Picture in Question
      answerSelectionType: "single",
      answers: [
        "none of the options",
        "props",
        "elements",
        "components",
      ],
      correctAnswer: "3",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer.",
      explanation:"Elements are the smallest building blocks of React apps. An element describes what you want to see on the screen: const element = <h1>Hello, world</h1>; Unlike browser DOM elements, React elements are plain objects, and are cheap to create.",
      point: "20",
    },
  ],
};
