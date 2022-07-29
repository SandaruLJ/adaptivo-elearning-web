import { CircularProgress } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTracking } from "react-tracking";
import { setCurrentUnit } from "../../service/usercourse.service";
import { courseActions } from "../../store/course-slice";
import "./ViewCourse.css";
const CourseOverlay = (props) => {
  const [progress, setProgress] = useState(0);
  const [timer, setTimer] = useState();
  const nextUnit = useSelector((state) => state.course.nextUnit);
  const { trackEvent } = useTracking();
  const id = useSelector((state) => state.course.id);

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

      const currentUnitRequest = {
        _id: id,
        sectionNum: nextUnit.section,
        unitNum: nextUnit.unit,
      };

      setCurrentUnit(currentUnitRequest);

      trackEvent({
        action: "next_video",
        time: moment().format("DD-MM-YYYY hh:mm:ss"),
      });
    }
  }, [progress]);
  const clickCancel = () => {
    props.setOverlay(false);
    clearInterval(timer);
    trackEvent({
      action: "previous_video",
      time: moment().format("DD-MM-YYYY hh:mm:ss"),
    });
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
