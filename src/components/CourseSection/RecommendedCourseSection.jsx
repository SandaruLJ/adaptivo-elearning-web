import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Grid } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { getAllCourses } from "../../service/course.service";
import CustomButton from "../Button/CustomButton";
import CourseCard from "../CourseCard/CourseCard";
import "./CourseSection.css";

const RecommendedCourseSection = (props) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getAllCourses().then((data) => {
      if (data) {
        const filtered = data.filter((course) => {
          if (course.title.includes("Adaptive")) {
            let lessonCount = 0;
            
            course.curriculum.map((section) => {
              section.units.map(() => lessonCount += 1);
            });

            course.lessonCount = lessonCount;

            return true;          
          }
          return false;
        });

        setCourses(filtered);
      }
    });
  }, []);

  return (
    <div className="course-section">
      <div className="section-title">{props.title}</div>
      <div className="section-categories">
        <Grid container justifyContent="flex-end" alignItems={"center"}>
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
          {courses.map((course) => (
            <Grid item>
              <CourseCard
                image={course.thumbnail.url}
                lessonCount={course.lessonCount}
                currency={"Rs."}
                price={course.price}
                title={course.title}
                instructor="[Self-paced]"
                rating="4.8"
                totalReviews="30"
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default RecommendedCourseSection;
