
import React from "react";
import { Grid } from "@mui/material";
import "./ViewQuiz.css";
import CustomAccordion from "../../components/Accordion/Accordion";
import CustomTab from "../../components/Tab/CustomTab";

const tabs = [
  {
    label: "Overview",
    body: <div>Overview</div>,
  },
  {
    label: "Q&A",
    body: <div>Q&A</div>,
  },
  {
    label: "Notes",
    body: <div>Notes</div>,
  },
  {
    label: "Review",
    body: <div>Review</div>,
  },
];
const ViewQuiz = () => {
  return (
    <div>
      <Grid container>
        <Grid item xs={9}>
         <div className="quiz_container">
         <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">How familiar are you with Force?</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    // defaultValue="female"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="neverHeard" control={<Radio />} label="I have never heard of it" />
                    <FormControlLabel value="" control={<Radio />} label="I have heard of it, but don't know what is it" />
                    <FormControlLabel value="" control={<Radio />} label="I have some idea of it, but it's not very clear" />
                    <FormControlLabel value="" control={<Radio />} label="I know what is it and could explain what it's used for" />
                    <FormControlLabel value="" control={<Radio />} label="I know what it is and when to use it, and I could use it to analyze data" />
                </RadioGroup>
                </FormControl>
         </div>

          <CustomTab tabs={tabs} />
        </Grid>
        <Grid item xs={3} className="course-content">
          <div className="course-content-title">Course Content</div>
          <CustomAccordion />
        </Grid>
      </Grid>
    </div>
  );
};
export default ViewQuiz;
