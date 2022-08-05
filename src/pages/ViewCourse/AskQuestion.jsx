import { ArrowBack } from "@mui/icons-material";
import { FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import React from "react";
import { useState } from "react";
import CustomButton from "../../components/Button/CustomButton";
import ForumQuestion from "./ForumQuestion";

const AskQuestion = (props) => {
  const [questionType, setQuestionType] = useState();
  const [goToForum, setGoToForum] = useState(false);
  const handleChange = (e) => {
    setQuestionType(e.target.value);
  };

  const goBackToQuestion = () => {
    props.setDisplayAskQuestion(false);
  };
  const clickContinue = () => {
    setGoToForum(true);
  };
  return (
    <div>
      {goToForum == false ? (
        <div className="ask-question-container">
          <Grid container justifyContent={"space-between"}>
            <Grid item>
              <div className="question-title">Ask Question</div>
            </Grid>
            <Grid item>
              <div className="back-questions" onClick={goBackToQuestion}>
                {<ArrowBack />}Back to all questions
              </div>
            </Grid>
          </Grid>
          <div className="question-title">My Questions Relate to</div>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={questionType}
            onChange={handleChange}
          >
            <FormControlLabel
              value="Course Content"
              control={<Radio />}
              label="Course Content"
            />
            <FormControlLabel
              value="general"
              control={<Radio />}
              label="General"
            />
          </RadioGroup>
          <CustomButton
            color="light-orange-bordered "
            name="continue"
            onclick={clickContinue}
          />
        </div>
      ) : (
        <ForumQuestion setGoToForum={setGoToForum}></ForumQuestion>
      )}
    </div>
  );
};

export default AskQuestion;
