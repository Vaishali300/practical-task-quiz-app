import React from "react";
import Button from "@material-ui/core/Button";

export default function Score({ questions, result, onClickRestart }) {
  const handelonClick = () => {
    onClickRestart();
  };
  return (
    <div className="result">
      <h3>Result</h3>
      <p>
        Total Question: <span>{questions.length}</span>
      </p>
      <p>
        Total Score:<span> {result.score}</span>
      </p>
      <p>
        Correct Answers:<span> {result.correctAnswers}</span>
      </p>
      <p>
        Wrong Answers:<span> {result.wrongAnswers}</span>
      </p>
      <Button variant="outlined" onClick={handelonClick}>
        Restart
      </Button>
    </div>
  );
}
