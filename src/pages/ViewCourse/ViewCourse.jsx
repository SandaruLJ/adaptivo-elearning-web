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
import PreferenceDialog from "../../components/Dialog/PreferenceDialog";
import moment from "moment";
import CourseOutline from "./CourseOutline";
import { useParams } from "react-router-dom";
import { getUserCourseById } from "../../service/usercourse.service";
import PdfViewer from "../../components/PdfViewer/PdfViewer";

const ViewCourse = (props) => {
  const [data, setData] = useState();
  const [overlay, setOverlay] = useState();
  const dispatch = useDispatch();
  const type = useSelector((state) => state.course.contentType);
  const body = useSelector((state) => state.course.contentBody);
  const { Track, trackEvent } = useTracking({ page: "ViewCourse" });
  const { id } = useParams();

  useEffect(() => {
    getData();
    trackEvent({
      action: "page_visit_viewCourse",
      time: moment().format("DD-MM-YYYY hh:mm:ss"),
    });
  }, []);

  const getData = async () => {
    //Fetches the data from the db
    const response = await getUserCourseById(id);
    console.log("In view course get data");
    console.log(response);
    dispatch(courseActions.setSelectedUnit({ section: response.currentUnit.sectionNum, unit: response.currentUnit.unitNum }));

    dispatch(courseActions.setId(response._id));
    dispatch(courseActions.setProgress(response.progress));
    dispatch(courseActions.setCourseName(response.courseId.title));
    dispatch(courseActions.setCurriculum([...response.learningPath]));
    dispatch(courseActions.setNextUnit());
    setData(response);
  };

  // const setMain = (type, body) => {
  //   setType(type);
  //   setBody(body);
  // };
  const tabs = [
    {
      label: "Overview",
      body: data && <Overview course={data.courseId} />,
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
    {
      label: "Outline",
      body: data && <CourseOutline course={data.courseId} />,
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
              {type == "file" && <PdfViewer url={body} setOverlay={setOverlay} />}
            </div>
            {data && <CustomTab tabs={tabs} />}
          </Grid>
          <Grid item xs={3} className="course-content">
            <div className="course-content-title">Course Content</div>
            {data && <CustomAccordion curriculum={data.learningPath} />}
          </Grid>
        </Grid>
      </div>
      <PreferenceDialog />
    </Track>
  );
};
export default ViewCourse;
