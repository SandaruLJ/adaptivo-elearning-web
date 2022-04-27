import React from "react";
import { Grid } from "@mui/material";
import "./ViewCourse.css";
import CustomAccordion from "../../components/Accordion/Accordion";
import CustomTab from "../../components/Tab/CustomTab";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";

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
          <VideoPlayer/>
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
