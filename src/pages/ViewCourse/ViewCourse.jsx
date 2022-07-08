import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import "./ViewCourse.css";
import CustomAccordion from "../../components/Accordion/Accordion";
import CustomTab from "../../components/Tab/CustomTab";
import { useFetch } from "../../components/useFetch";
import { getCourseById } from "../../service/course.service";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import { generateLicenseToken } from "../../service/videoPlayer.service";
import NoteDisplay from "./NoteDisplay";
import { courseActions } from "../../store/course-slice";
import { useDispatch, useSelector } from "react-redux";
import CourseOverlay from "./CourseOverlay";
import Overview from "./Overview";
import { useTracking } from "react-tracking";
import QuizDisplay from "./QuizDisplay";
import TopBar from "../../components/TopBar/TopBar";

const ViewCourse = (props) => {
  const [data, setData] = useState();
  const [overlay, setOverlay] = useState();
  const dispatch = useDispatch();
  const type = useSelector((state) => state.course.contentType);
  const body = useSelector((state) => state.course.contentBody);
  const { Track, trackEvent } = useTracking({ page: "ViewCourse" });

  const getData = async () => {
    //Fetches the data from the db
    const response = await getCourseById("628d437fd2ead54fca9b1b07");
    console.log(response);
    setData(response);
    dispatch(courseActions.setCourseName(response.title));
    dispatch(courseActions.setCurriculum([...response.curriculum]));
    dispatch(courseActions.setSelectedUnit({ section: 0, unit: 0 }));
    dispatch(courseActions.setNextUnit());
  };
  useEffect(() => {
    getData();
  }, []);

  // const setMain = (type, body) => {
  //   setType(type);
  //   setBody(body);
  // };
  const tabs = [
    {
      label: "Overview",
      body: <Overview course={data} />,
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

  return (
    <Track>
      <div>
        <TopBar signOut={props.signOut} />
        <Grid container className="view-course-grid">
          <Grid item xs={9} className="view-course-left-container">
            <div className="view-course-main-container">
              {overlay && <CourseOverlay setOverlay={setOverlay} />}
              {type == "video" && <VideoPlayer src={body} setOverlay={setOverlay} />}
              {type == "note" && <NoteDisplay note={body} setOverlay={setOverlay} />}
              {type == "quiz" && <QuizDisplay note={body} setOverlay={setOverlay} />}
            </div>
            {data && <CustomTab tabs={tabs} />}
          </Grid>
          <Grid item xs={3} className="course-content">
            <div className="course-content-title">Course Content</div>
            {data && <CustomAccordion curriculum={data.curriculum} />}
          </Grid>
        </Grid>
      </div>
    </Track>
  );
};
export default ViewCourse;
