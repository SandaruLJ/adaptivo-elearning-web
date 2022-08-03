import { Star } from "@mui/icons-material";
import { Grid } from "@mui/material";
import React from "react";
import CustomButton from "../../components/Button/CustomButton";
import LinearProgressWithLabel from "../../components/LinearProgress/LinearProgresswithLabel";
import "./MyCourses.css";
import { useNavigate } from "react-router-dom";

const SingleMyCourse = (props) => {
  const navigate = useNavigate();

  return (
    <div className="my-course-container">
      <Grid container spacing={0}>
        <Grid item md={2.5}>
          <img src={props.thumbnail} className="my-course-thumbnail" />
        </Grid>
        <Grid item className="my-course-details" md={9}>
          <div className="my-course-name">{props.name}</div>
          <div className="ratings-container">
            <Grid container spacing={1}>
              <Star color="disabled" />
              <Star color="disabled" />
              <Star color="disabled" />
              <Star color="disabled" />
              <Star color="disabled" />
            </Grid>
          </div>
          <div className="my-course-instructor">{props.instructor}</div>
          <div className="completion-percentage">
            <LinearProgressWithLabel value={Math.ceil(props.progress)} displayValue={false} />
            <div className="completion-percentage-value">{Math.ceil(props.progress)}% Complete</div>
          </div>

          <div className="mt-1">
            {props.progress == 0 ? (
              <CustomButton color="orange fit-content" name="Start Learning" onclick={() => navigate(`/course/${props.id}`)} />
            ) : (
              <CustomButton color="light-orange-bordered fit-content" name="Continue Learning" onclick={() => navigate(`/course/${props.id}`)} />
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SingleMyCourse;
