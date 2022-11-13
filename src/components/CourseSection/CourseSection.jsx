import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Grid } from "@mui/material";
import React from "react";
import CustomButton from "../Button/CustomButton";
import CourseCard from "../CourseCard/CourseCard";
import "./CourseSection.css";

const CourseSection = (props) => {
  return (
    <div className="course-section">
      <div className="section-title">{props.title}</div>
      <div className="section-categories">
        <Grid container justifyContent="space-between" alignItems={"center"}>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <CustomButton name="All Courses" color="light-orange-bordered" />
              </Grid>
              <Grid item>
                <CustomButton name="Python" color="light-grey-bordered" />
              </Grid>
              <Grid item>
                <CustomButton name="Php" color="light-grey-bordered" />
              </Grid>
              <Grid item>
                <CustomButton name="HTML" color="light-grey-bordered" />
              </Grid>
              <Grid item>
                <CustomButton name="CSS" color="light-grey-bordered" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <CustomButton name={<ArrowBackIos fontSize="small" />} color="light-grey-bordered" />
              </Grid>
              <Grid item>
                <CustomButton name={<ArrowForwardIos fontSize="small" />} color="light-grey-bordered" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className="section-courses">
        <Grid container spacing={2}>
          <Grid item>
            <CourseCard
              image="images/math-background.jpg"
              lessonCount={12}
              currency={"Rs."}
              price={"550.00"}
              title="Grade 10 Maths"
              instructor="Angela Yu"
              rating="4.9"
              totalReviews="10"
              link={"/course-info/62f7fce07447892f99ccedf2"}
            />
          </Grid>
          <Grid item>
            <CourseCard
              image="images/science-background.jpg"
              lessonCount={15}
              currency={"Rs."}
              price={"800.00"}
              title="Grade 10 Science"
              instructor="Angela Yu"
              rating="4.9"
              totalReviews="10"
              link={"/course-info/62ea7ec10adc970a2ee22b00"}
            />
          </Grid>
          {/* <Grid item>
            <CourseCard
              image="images/home/course-thumbnail.jpg"
              lessonCount={12}
              currency={"Rs."}
              price={"550.00"}
              title="The Complete 2022 Web Development Bootcamp"
              instructor="Angela Yu"
              rating="4.9"
              totalReviews="10"
            />
          </Grid>
          <Grid item>
            <CourseCard
              image="images/home/course2.png"
              lessonCount={12}
              currency={"Rs."}
              price={"550.00"}
              title="The Complete 2022 Web Development Bootcamp"
              instructor="Angela Yu"
              rating="4.9"
              totalReviews="10"
            />
          </Grid> */}
        </Grid>
      </div>
    </div>
  );
};

export default CourseSection;
