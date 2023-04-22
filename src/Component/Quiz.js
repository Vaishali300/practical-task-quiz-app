import React, { useState, useEffect } from "react";
import "../index.css";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Start from "./Start";
import { quiz } from "../Constant/questions";
import Score from "./Score";
import Button from "@material-ui/core/Button";

const Quiz = ({ setQuizStart, QuizStart }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { questions } = quiz;
  const { question, options, correctAnswer } = questions[activeQuestion];
  const [value, setValue] = useState("");

  const onClickRestart = () => {
    setQuizStart(false);
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    onAnswerSelected(value);
  }, [value]);

  const onClickNext = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 1,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );
    setSelectedAnswer("");
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
  };

  const onAnswerSelected = (answer) => {
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    } else if (answer !== correctAnswer) {
      setSelectedAnswer(false);
    }
  };

  const handelShowQuestion = (number) =>
    number > questions.length ? number : `0${number}`;

  return (
    <div className="quiz-container">
      {!showResult ? (
        <div>
          <div>
            <span className="active-question-no">
              {handelShowQuestion(activeQuestion + 1)}
            </span>
            <span className="total-question">
              {handelShowQuestion(questions.length)}
            </span>
          </div>
          <h2>{question}</h2>
          <ul>
            {options.map((answer, index) => (
              <>
                <li key={answer}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="ans"
                      name="ans"
                      value={value}
                      onChange={(event) => {
                        handleChange(event, index);
                      }}
                    >
                      <FormControlLabel
                        value={answer}
                        control={<Radio />}
                        label={answer}
                      />
                    </RadioGroup>
                  </FormControl>
                </li>
              </>
            ))}
          </ul>

          <div className="score">
            <div className="flex-left">
              <span className="active-question-no">
                <strong>{`${result.score} / ${questions.length}`} </strong>
              </span>
              <span className="total-question">(Score/Questions)</span>
            </div>
            <div className="flex-right">
              <Button variant="outlined" onClick={onClickNext}>
                {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Score
          questions={questions}
          result={result}
          onClickRestart={onClickRestart}
        />
      )}
      {!QuizStart ? <Start /> : null}
    </div>
  );
};

export default Quiz;
