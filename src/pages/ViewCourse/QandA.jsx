import { Forum, Search } from "@mui/icons-material";
import { Grid } from "@mui/material";
import React from "react";
import { useState } from "react";
import Input from "../../components/Input/Input";
import AskQuestion from "./AskQuestion";
import "./ViewCourse.css";

const QandA = () => {
  const [search, setSearch] = useState();
  const onSearchChange = () => {};
  const [displayAskQuestion, setDisplayAskQuestion] = useState(false);
  const clickAskQuestion = () => {
    setDisplayAskQuestion(true);
  };
  return (
    <div>
      <Input
        id="Search"
        placeholder="Search all Course Question"
        value={search}
        onChange={onSearchChange}
        label="Search Questions"
        endIcon={<Search />}
      ></Input>
      {displayAskQuestion == false ? (
        <div className="question-container">
          <Grid container justifyContent={"space-between"}>
            <Grid item>
              <div className="question-title">All Questions in the Course</div>
            </Grid>
            <Grid item>
              <div className="ask-question" onClick={clickAskQuestion}>
                +Ask a question
              </div>
            </Grid>
          </Grid>
          <div className="all-questions">
            <Grid container justifyContent={"space-between"}>
              <Grid item md={1}>
                <div className="profile-pic">
                  <img src="/images/home/image-01.png" />
                </div>
              </Grid>
              <Grid item md={10}>
                <div className="question">Sir What is mean by force?</div>
                <div className="que-student-name">
                  Piumi Ekanayake Lec-03 02/10/2022
                </div>
              </Grid>
              <Grid item md={1}>
                <div className="Reply">
                  <Forum />
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      ) : (
        <AskQuestion setDisplayAskQuestion={setDisplayAskQuestion} />
      )}
    </div>
  );
};
export default QandA;
