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
import { getNextQuestion } from "../../service/preTest.service";
import { setQuizScore } from "../../service/usercourse.service";
import RecommendationDialog from "../../components/Dialog/RecommendationDialog";

const PreTestDisplay = () => {
  const [isStarted, setIsStarted] = useState();
  const [isFinished, setIsFinished] = useState();
  const [viewAnswers, setViewAnswer] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [questionNum, setQuestionNum] = useState(0);
  const [answers, setAnswers] = useState(["0"]);
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState();
  const [isCorrect, setIsCorrect] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [viewExplanation, setViewExplanation] = useState(false);

  const dispatch = useDispatch();
  const selectedUnit = useSelector((state) => state.course.selectedUnit);
  const id = useSelector((state) => state.course.id);

  const unit = useSelector((state) => state.course.curriculum[selectedUnit.section]["units"][selectedUnit.unit]);
  const [quiz, setQuiz] = useState([]);
  const [conceptId, setConceptId] = useState(unit.preTest._id);
  const [prevConceptId, setPrevConceptId] = useState("0");
  const [loId, setLOId] = useState("0");
  const [incorrectLoIds, setIncorrectLoIds] = useState([]);

  useEffect(() => {
    if (answers.length == 0) {
      setAnswers(answers.fill("-1", 0, 10));
    }
    const firstQuestion = {
      answers: ["<p>I have heard and I know what it is</p>\n", "<p>I have heard but I am not very sure about it</p>\n", "<p>I have never heard</p>\n"],
      correctAnswer: 0,
      lo: "62e94af54b2cdca5b1245d88",
      question: '<p><span style="color: rgba(0,0,0,0.87);background-color: rgb(255,255,255);font-size: medium;font-family: Poppins, sans-serif;">Have you heard of Newton\'s 1st Law?</span>&nbsp;</p>',
    };
    setQuiz([firstQuestion]);
  }, []);

  const calculateMarks = async () => {
    setIsFinished(true);

    let qNum = quiz.length - 1;
    let inCorrect = incorrectLoIds.length;
    let correct = qNum - inCorrect;

    let percentage = (correct / qNum) * 100;
    setPercentage(percentage);

    const response = {
      _id: id,
      sectionCount: selectedUnit.section,
      unitCount: selectedUnit.unit,
      score: percentage,
    };
    await setQuizScore(response);
  };
  const selectAnswer = (e) => {
    let temp = [...answers];
    temp[questionNum] = e.target.value;
    setAnswers(temp);
  };

  const checkAnswer = () => {
    if (quiz[questionNum].correctAnswer == answers[questionNum]) {
      return true;
    } else {
      return false;
    }
  };

  const nextQuestion = async () => {
    let isAnswerCorrect = checkAnswer();

    if (questionNum != 0) {
      if (!isAnswerCorrect) {
        let temp = [...incorrectLoIds, quiz[questionNum].lo];
        setIncorrectLoIds([...incorrectLoIds, quiz[questionNum].lo]);
      } else {
        if (incorrectLoIds.includes(quiz[questionNum].lo)) {
          let temp = incorrectLoIds;
          let filteredArray = temp.filter((loId) => loId != quiz[questionNum].lo);
          setIncorrectLoIds([...filteredArray]);
        }
      }
    }

    if (questionNum == quiz.length - 1) {
      setIsLoading(true);
      const request = {
        target: unit.preTest,
        prevConcept: prevConceptId,
        prevLearningObject: loId,
        answerCorrect: isAnswerCorrect,
      };
      console.log(request);
      let next_question = await getNextQuestion(request);
      if (next_question.hasOwnProperty("passed")) {
        // setIsFinished(true);
        calculateMarks();
      } else {
        setPrevConceptId(next_question.concept);
        setLOId(next_question.lo);
        setQuiz([...quiz, next_question]);
        setQuestionNum(questionNum + 1);
        setIsLoading(false);
      }
      console.log(next_question);
    } else {
      setQuestionNum(questionNum + 1);
    }
  };
  const previousQuestion = () => {
    if (questionNum != 0) {
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
          <div className="caption">The number of questions may depend on your existing knowledge..</div>
          <div className="mt-3">
            <Grid container spacing={2}>
              <Grid item>
                <CustomButton name="Start Quiz" color="orange" type="submit" onclick={() => setIsStarted(true)} />
              </Grid>
              {/* <Grid item>
                <CustomButton name="Skip Quiz" color="light-grey-bordered" type="cancel" />
              </Grid> */}
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
                <CustomButton name="Next" loading={isLoading} color="orange next-btn" type="submit" onclick={nextQuestion} />
              </Grid>
            </Grid>
          </div>
        </div>
      ) : isFinished & !viewAnswers ? (
        <div>
          <div className={`finish-score-container great`}>
            <h2>Good Job!</h2>
            <h3>Thank you for completing the quiz! We are analyzing your knowledge. Please wait until the analysis is completed.</h3>
          </div>
          <div className="finish-quiz-body">
            {/* <div className="quiz-action-btns">
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
            </div> */}
          </div>
        </div>
      ) : (
        ""
      )}
      {isFinished && <RecommendationDialog knowledgeResults={incorrectLoIds} />}
    </div>
  );
};
export default PreTestDisplay;
