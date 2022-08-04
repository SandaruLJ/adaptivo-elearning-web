import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Button, Grid } from "@mui/material";
import { Interweave } from "interweave";
import React, { useEffect, useState } from "react";
import "./ViewCourse.css";
import { getQuizById } from "../../service/quiz.service";
import { useDispatch, useSelector } from "react-redux";
import { quizActions } from "../../store/quiz-slice";
import CustomButton from "../../components/Button/CustomButton";
import { Check, Close } from "@mui/icons-material";
import "./QuizDisplay.css";
import Box from "@mui/material/Box";
import QuizStart from "./QuizStart";
import { courseActions } from "../../store/course-slice";

const QuizDisplay = () => {
  const [isStarted, setIsStarted] = useState();
  const [isFinished, setIsFinished] = useState();
  const [viewAnswers, setViewAnswer] = useState();

  const [questionNum, setQuestionNum] = useState(0);
  const [answers, setAnswers] = useState(["0", "0"]);
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState();
  const [isCorrect, setIsCorrect] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [viewExplanation, setViewExplanation] = useState(false);

  const dispatch = useDispatch();
  const selectedUnit = useSelector((state) => state.course.selectedUnit);
  const unit = useSelector((state) => state.course.curriculum[selectedUnit.section]["units"][selectedUnit.unit]);
  const quiz = unit.quiz;

  useEffect(() => {
    if (answers.length == 0) {
      setAnswers(answers.fill("-1", 0, quiz.length));
    }
  }, []);

  const calculateMarks = () => {
    setIsFinished(true);
    setViewAnswer(false);
    const correctAnswers = quiz.map((e) => e.correctAnswer);
    setCorrectAnswers(correctAnswers);
    const temp = [];
    let score = 0;

    correctAnswers.map((correctAnswer, index) => {
      if (correctAnswer == answers[index]) {
        temp[index] = true;
        score++;
      } else {
        temp[index] = false;
      }
    });
    let percentage = (score / quiz.length) * 100;
    setScore(score);
    setPercentage(percentage);
    setIsCorrect(temp);
  };
  const selectAnswer = (e) => {
    let temp = [...answers];
    temp[questionNum] = e.target.value;
    setAnswers(temp);
  };

  const nextQuestion = () => {
    if (questionNum < quiz.length - 1) {
      setViewExplanation(false);
      setQuestionNum(questionNum + 1);
    }
  };
  const previousQuestion = () => {
    if (questionNum != 0) {
      setViewExplanation(false);
      setQuestionNum(questionNum - 1);
    }
  };
  const retryQuiz = () => {
    setScore(0);
    setIsFinished(false);
    setIsStarted(false);
    setCorrectAnswers([]);
    setViewAnswer(false);
    setAnswers(answers.fill("-1", 0, quiz.length));
    setQuestionNum(0);
    setIsCorrect([]);
  };
  const nextSection = () => {
    dispatch(courseActions.goToNextUnit());
    dispatch(courseActions.setNextUnit());
  };

  return (
    <div className="quiz-container">
      {!isStarted ? (
        <div className="start-quiz-container">
          <h2>
            <strong>Quiz: {unit.name}</strong>
          </h2>
          <div className="caption">
            {unit.quiz.length} {unit.quiz.length == 1 ? "question" : "questions"}
          </div>
          <div className="mt-3">
            <Grid container spacing={2}>
              <Grid item>
                <CustomButton name="Start Quiz" color="orange" type="submit" onclick={() => setIsStarted(true)} />
              </Grid>
              <Grid item>
                <CustomButton name="Skip Quiz" color="light-grey-bordered" type="cancel" />
              </Grid>
            </Grid>
          </div>
        </div>
      ) : isStarted && !isFinished ? (
        <div>
          <div>
            <h3 className="quiz-question">
              {questionNum + 1}. <Interweave content={quiz[questionNum].question} />
            </h3>
            <div className="answers-container mt-2">
              <RadioGroup name={`quiz-answers`} value={answers[questionNum]} onChange={selectAnswer}>
                {quiz[questionNum].answers.map((answer, index) => {
                  return (
                    <div key={index}>
                      <FormControlLabel value={index} control={<Radio />} label={<Interweave content={answer} />} />
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
          </div>

          <div className="quiz-action-btns">
            <Grid container justifyContent="flex-end" spacing={2} className="mt-2">
              <Grid item>{questionNum != 0 && <CustomButton name="Previous" color="grey" type="cancel" onclick={previousQuestion} />}</Grid>
              <Grid item>
                {questionNum == quiz.length - 1 ? (
                  <CustomButton name="Finish" color="orange" type="submit" onclick={calculateMarks} />
                ) : (
                  <CustomButton name="Next" color="orange" type="submit" onclick={nextQuestion} />
                )}
              </Grid>
            </Grid>
          </div>
        </div>
      ) : isFinished & !viewAnswers ? (
        <div>
          <div
            className={`finish-score-container
            ${percentage > 75 ? "great" : percentage > 50 ? "good" : percentage > 35 ? "average" : "poor"}
            `}
          >
            <h2>{percentage > 75 ? "Great Job!" : percentage > 50 ? "Good Job!" : percentage > 35 ? "Average Score!" : "Poor Score!"}</h2>
            <h3>
              You've got {score} out of {quiz.length} correct
            </h3>
          </div>
          <div className="finish-quiz-body">
            <Grid container spacing={2}>
              <Grid item>
                <Check />
              </Grid>
              <Grid item>
                <h3>
                  <strong>What you know - </strong>
                </h3>
                <ul>
                  <li>Newton's 1st Law</li>
                  <li>Newton's 2nd Law</li>
                </ul>
              </Grid>
            </Grid>

            <Grid container spacing={2} className="mt-3">
              <Grid item>
                <Close />
              </Grid>
              <Grid item>
                <h3>
                  <strong>What you need to improve - </strong>
                </h3>
                <ul>
                  <li>Newton's 1st Law</li>
                  <li>Newton's 2nd Law</li>
                </ul>
              </Grid>
            </Grid>
            <div className="quiz-action-btns">
              <Grid container justifyContent="flex-end" spacing={2} className="mt-2">
                <Grid item>
                  <CustomButton
                    name="View Answers"
                    color="grey"
                    type="cancel"
                    onclick={() => {
                      setQuestionNum(0);
                      setViewAnswer(true);
                    }}
                  />
                </Grid>
                <Grid item>
                  {score == quiz.length ? (
                    <CustomButton name="Go to Next Section" color="orange" type="submit" onclick={nextSection} />
                  ) : (
                    <CustomButton name="Retry Quiz" color="orange" type="submit" onclick={retryQuiz} />
                  )}
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <h3 className={`quiz-question ${isCorrect[questionNum] ? "correct" : "wrong"}`}>
              {questionNum + 1}. <Interweave content={quiz[questionNum].question} />
            </h3>

            <div className="answers-container mt-2">
              <RadioGroup name={`quiz-answers`} value={answers[questionNum]} onChange={selectAnswer}>
                {quiz[questionNum].answers.map((answer, index) => {
                  return (
                    <div
                      key={index}
                      className={!isCorrect[questionNum] && index == answers[questionNum] ? `wrong-answer-container` : index == correctAnswers[questionNum] ? "correct-answer-container" : ""}
                    >
                      <Grid container alignItems="flex-end">
                        <Grid item>
                          <FormControlLabel value={index} control={<Radio />} label={<Interweave content={answer} />} />
                        </Grid>
                        <Grid item>{!isCorrect[questionNum] && index == answers[questionNum] ? <Close /> : index == correctAnswers[questionNum] ? <Check /> : ""}</Grid>
                      </Grid>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
            {isCorrect[questionNum] ? (
              <div className="explanation-container-correct">
                <h3>Great, You've got this right!</h3>
                <div className="mt-2">
                  <CustomButton
                    name="View Explanation"
                    color="light-green-bordered fit-content"
                    type="submit"
                    onclick={() => {
                      setViewExplanation(true);
                    }}
                  />
                </div>
                {viewExplanation && (
                  <div className="mt-2">
                    <h4 className="explanation-txt">Explanation</h4>
                    <Interweave content={quiz[questionNum].explanation} />
                  </div>
                )}
              </div>
            ) : (
              <div className="explanation-container-wrong">
                <h3>Sorry, You didn't get this right!</h3>
                <div className="mt-2">
                  <CustomButton
                    name="View Explanation"
                    color="light-red-bordered fit-content"
                    type="submit"
                    onclick={() => {
                      setViewExplanation(true);
                    }}
                  />
                </div>
                {viewExplanation && (
                  <div className="mt-2">
                    <h4 className="explanation-txt">Explanation</h4>
                    <Interweave content={quiz[questionNum].explanation} />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="quiz-action-btns">
            <Grid container justifyContent="flex-end" spacing={2} className="mt-2">
              <Grid item>{questionNum != 0 && <CustomButton name="Previous" color="grey" type="cancel" onclick={previousQuestion} />}</Grid>
              <Grid item>
                {questionNum == quiz.length - 1 ? (
                  <CustomButton name="Finish" color="orange" type="submit" onclick={calculateMarks} />
                ) : (
                  <CustomButton name="Next" color="orange" type="submit" onclick={nextQuestion} />
                )}
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </div>
  );
};
export default QuizDisplay;
