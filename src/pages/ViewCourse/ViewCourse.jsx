import React from "react";
import { Grid } from "@mui/material";
import "./ViewCourse.css";
import CustomAccordion from "../../components/Accordion/Accordion";
import CustomTab from "../../components/Tab/CustomTab";
import { RadioGroup } from '@mui/material';
import { FormControl } from '@mui/material';
import { FormLabel } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { Radio } from '@mui/material';

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
const ViewCourse = () => {
  return (
    <div>
      <Grid container>
        <Grid item xs={9}>
          {/* <video className="video_preview" controls src="" /> */}
          <div className="quiz_container">
         <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">How familiar are you with Force?</FormLabel>
                <br></br>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    // defaultValue="female"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="a" control={<Radio />} label="I have never heard of it" />
                    <FormControlLabel value="b" control={<Radio />} label="I have heard of it, but don't know what is it" />
                    <FormControlLabel value="c" control={<Radio />} label="I have some idea of it, but it's not very clear" />
                    <FormControlLabel value="d" control={<Radio />} label="I know what is it and could explain what it's used for" />
                    <FormControlLabel value="e" control={<Radio />} label="I know what it is and when to use it, and I could use it to analyze data" />
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
export default ViewCourse;
