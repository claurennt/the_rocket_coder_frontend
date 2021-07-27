import React from "react";
import Quiz from "react-quiz-component";
import { quiz } from "./quiz";
import Robot from "./Robot.jpeg";

function RoboCodingQuiz() {
  const onCompleteAction = (obj) => {
    console.log(obj);
    // YOUR LOGIC GOES HERE
  };
  return (
    <div
      className="background"
      style={{
        background: ` url(${Robot}`,
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <div
        className="quizes"
        style={{
          marginLeft: "180px",
          marginTop: "0px",
        }}
      >
        <Quiz
          quiz={quiz}
          shuffle={true}
          showDefaultResult={true}
          onComplete={onCompleteAction}
          showInstantFeedback={true}
        />
      </div>
    </div>
  );
}

export default RoboCodingQuiz;
