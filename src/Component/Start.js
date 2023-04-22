import React, { useState } from "react";
import "../index.css";
import Quiz from "./Quiz";
import Button from "@material-ui/core/Button";

export default function Start() {
  const [QuizStart, setQuizStart] = useState(false);
  const onClickStart = () => {
    setQuizStart(true);
  };
  return (
    <>
      {!QuizStart ? (
        <div className="quiz-container">
          <Button variant="outlined" onClick={onClickStart}>
            Start the Quiz
          </Button>
        </div>
      ) : (
        <Quiz setQuizStart={setQuizStart} QuizStart={QuizStart} />
      )}
    </>
  );
}
