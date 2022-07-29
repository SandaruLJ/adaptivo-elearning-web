import { ArrowBackIos, ArrowForwardIos, Star } from "@mui/icons-material";
import { Grid } from "@mui/material";
import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import { useTracking } from "react-tracking";
import CustomButton from "../../components/Button/CustomButton";
import Header from "../../components/Header/Header";
import LinearProgressWithLabel from "../../components/LinearProgress/LinearProgresswithLabel";
import { getAllCoursesByUserId } from "../../service/usercourse.service";
import "./MyCourses.css";
import SingleMyCourse from "./SingleMyCourse";

const MyCourses = () => {
  const { Track, trackEvent } = useTracking({ page: "myCourses" });
  const [data, setData] = useState();

  const getData = async () => {
    //Fetches the data from the db
    const response = await getAllCoursesByUserId("62272fbfc8ea4d8b75b76aa2");
    setData(response);
  };

  useEffect(() => {
    getData();
    trackEvent({
      action: "page_visit_myCourses",
      time: moment().format("DD-MM-YYYY hh:mm:ss"),
    });
  }, []);

  return (
    <div className="my-courses">
      <div className="header-container">
        <Header />
      </div>
      <div className="page-body">
        <div className="page-title-container">
          <div className="page-title-inner-container width-1170">
            <div className="page-title">My Courses</div>
            <div className="page-breadcrumb">
              <Grid container alignItems={"flex-start"} spacing={1}>
                <Grid item>Home</Grid>
                <Grid item>{<ArrowForwardIos fontSize="small" />}</Grid>
                <Grid item>My Courses</Grid>
              </Grid>
            </div>
          </div>
          <div className="shape-top-wrapper">
            <div className="shape-image shape-top-1">
              <img src="/images/top-container/shape-1.png" />
            </div>
            <div className="shape-image shape-top-2">
              <img src="/images/top-container/shape-6.png" />
            </div>
            <div className="shape-image shape-top-3">
              <img src="/images/top-container/shape-5.png" />
            </div>
            <div className="shape-image shape-top-4">
              <img src="/images/top-container/shape-2.png" />
            </div>
            <div className="shape-image shape-top-5">
              <img src="/images/top-container/shape-3.png" />
            </div>
            <div className="shape-image shape-top-6">
              <img src="/images/top-container/shape-4.png" />
            </div>
            <div className="shape-image shape-top-7">
              <img src="/images/top-container/shape-7.png" />
            </div>
          </div>
        </div>
        {data && data.map((course) => <SingleMyCourse id={course._id} name={course.courseId.title} thumbnail={course.courseId.thumbnail.url} instructor={"Dr.Angela Yu"} progress={course.progress} />)}
      </div>
    </div>
  );
};
export default MyCourses;
