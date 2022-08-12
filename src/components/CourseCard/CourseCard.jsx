import { Laptop, Star, SupervisedUserCircle } from "@mui/icons-material";
import { Grid } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CourseCard.css";

const CourseCard = (props) => {
  const navigate = useNavigate();
  return (
    <div className="course-card" onClick={() => navigate("/mycourses")}>
      <div className="course-thumbnail">
        <img src={props.image} />
      </div>
      <div className="course-card-body">
        <div className="course-card-body-top-container">
          <Grid container justifyContent={"space-between"} alignItems="flex-start">
            <Grid item>
              <Grid container spacing={2} alignItems="flex-start">
                <Grid item>
                  <Laptop />
                </Grid>
                <Grid item>{props.lessonCount} Lessons</Grid>
              </Grid>
            </Grid>
            <Grid item>
              <div className="course-price">
                {props.currency}
                {props.price}
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="course-title">{props.title}</div>
        <div className="course-card-body-bottom-container">
          <Grid container justifyContent={"space-between"} alignItems="center">
            <Grid item>
              <Grid container spacing={2} alignItems="flex-start">
                <Grid item>
                  <SupervisedUserCircle />
                </Grid>
                <Grid item>{props.instructor}</Grid>
              </Grid>
            </Grid>
            <Grid item>
              <div className="rating">
                <Grid container spacing={1} alignItems="flex-start">
                  <Grid item>
                    <Star />
                  </Grid>
                  <Grid item>
                    <div className="rating">
                      {" "}
                      {props.rating} ({props.totalReviews})
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
