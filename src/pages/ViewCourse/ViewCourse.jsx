import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import "./ViewCourse.css";
import CustomAccordion from "../../components/Accordion/Accordion";
import CustomTab from "../../components/Tab/CustomTab";
import { useFetch } from "../../components/useFetch";
import { getCourseById } from "../../service/course.service";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import { generateLicenseToken } from "../../service/videoPlayer.service";

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
  const [data, setData] = useState();
  const [main, setMain] = useState({
    type: "video",
    body: "",
  });
  const getData = async () => {
    //Fetches the data from the db
    const response = await getCourseById("6269d0c1fac8add4e331dbb7");
    console.log(response);
    setData(response);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Grid container className="view-course-grid">
        <Grid item xs={9} className="view-course-left-container">
          <div className="view-course-main-container">{main.type == "video" && <VideoPlayer src={main.body} />}</div>
          {data && <CustomTab tabs={tabs} />}
        </Grid>
        <Grid item xs={3} className="course-content">
          <div className="course-content-title">Course Content</div>
          {data && <CustomAccordion curriculum={data.curriculum} setMain={setMain} />}
        </Grid>
      </Grid>
    </div>
  );
};
export default ViewCourse;
