import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { courseActions } from "../../store/course-slice";
import "./ViewCourse.css";
const CourseOverlay = (props) => {
  const [progress, setProgress] = useState(0);
  const [timer, setTimer] = useState();
  const nextUnit = useSelector((state) => state.course.nextUnit);

  const dispatch = useDispatch();

  useEffect(() => {
    if (progress == 100) {
      clearInterval(timer);
    }
    setTimer(
      setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 20));
      }, 600)
    );

    return () => {
      clearInterval(timer);
    };
  }, []);
  useEffect(() => {
    if (progress == 100) {
      clearInterval(timer);
      dispatch(courseActions.goToNextUnit());
      dispatch(courseActions.setNextUnit());
      props.setOverlay(false);
    }
  }, [progress]);
  const clickCancel = () => {
    props.setOverlay(false);
    clearInterval(timer);
  };
  return (
    <div className="view-course-overlay">
      <div className="overlay-content">
        <h5>Up Next</h5>
        <h2 className="next-title">
          {nextUnit.section + 1}.{nextUnit.unit + 1} {nextUnit.unitName}
        </h2>
        <CircularProgress variant="determinate" value={progress} size={60} thickness={5} />
        <h4 className="cancel-text" onClick={clickCancel}>
          Cancel
        </h4>
      </div>
    </div>
  );
};
export default CourseOverlay;
