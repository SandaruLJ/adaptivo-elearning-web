import { Grid } from "@mui/material";
import { Interweave } from "interweave";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useTracking } from "react-tracking";
import "./ViewCourse.css";
const CourseOutline = (props) => {
  const curriculum = props.course.curriculum;
  const { trackEvent } = useTracking();

  useEffect(() => {
    trackEvent({
      action: "view_outline",
      time: moment().format("DD-MM-YYYY hh:mm:ss"),
    });
  }, []);

  return (
    <div>
      <h3 className="w-700 mb-1">Course Outline</h3>
      <div>This course consists of {curriculum.length} sections.</div>
      {curriculum.map((data, i) => {
        return (
          <div>
            <h4 className="outline-section-name">{`Section ${i + 1} - ${data.name}`}</h4>
            <ul className="outline-list">
              {data.units.map((unit) => (
                <div>
                  <li>{unit.name}</li>
                </div>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};
export default CourseOutline;
