import { Grid } from "@mui/material";
import { Interweave } from "interweave";
import React from "react";

const Overview = (props) => {
  const course = props.course;
  return (
    <div>
      <h3 className="w-700 mb-1">About</h3>
      <Interweave content={course.description} />
      <h3 className="w-700 mb-1 mt-1">General Info</h3>

      <Grid container spacing={12}>
        <Grid item>
          <div className="mb-1">
            <strong>Skill Level : </strong>
            {course.level}
          </div>
          <div>
            <strong>Lectures : </strong> {400}
          </div>
        </Grid>
        <Grid item>
          <div className="mb-1">
            <strong>Language : </strong> {course.language}
          </div>
          <div>
            <strong>Video : </strong> 50 hours
          </div>
        </Grid>
      </Grid>

      <h3 className="w-700 mb-1 mt-1">What are the learning oucomes of this course?</h3>

      {course.outcomes.map((outcome, index) => {
        return <li>{outcome}</li>;
      })}
      <h3 className="w-700 mb-1 mt-1">Are there any pre-requisties for this course?</h3>

      {course.requirements.map((requirement, index) => {
        return <li>{requirement}</li>;
      })}
    </div>
  );
};
export default Overview;
