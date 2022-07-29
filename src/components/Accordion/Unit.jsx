import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Accordion.css";
import { Checkbox, Grid } from "@mui/material";
import { PlayCircle, Audiotrack, Description, Quiz } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { courseActions } from "../../store/course-slice";
import { useTracking } from "react-tracking";
import moment from "moment";
import { markComplete, setCurrentUnit } from "../../service/usercourse.service";

export default function Unit(props) {
  const selectedUnit = useSelector((state) => state.course.selectedUnit);
  const curriculum = useSelector((state) => state.course.curriculum);

  // const isCompleted = useSelector((state) => state.course.curriculum[props.sectionNum - 1].units[props.unitNum - 1].isComplete);
  const id = useSelector((state) => state.course.id);

  const [type, setType] = useState();
  const [checked, setChecked] = useState(props.unit.isCompleted);
  const dispatch = useDispatch();
  const { trackEvent } = useTracking();

  useEffect(() => {
    if (curriculum.length > 0) {
      setChecked(curriculum[props.sectionNum - 1].units[props.unitNum - 1].isCompleted);
      // console.log(curriculum[props.sectionNum - 1].units[props.unitNum - 1].isComplete);
    }
  }, [curriculum]);
  const handleUnitClick = () => {
    dispatch(courseActions.setSelectedUnit({ section: props.sectionNum - 1, unit: props.unitNum - 1 }));
    setMain();
    dispatch(courseActions.setNextUnit());
    trackEvent({
      action: "click_unit",
      time: moment().format("DD-MM-YYYY hh:mm:ss"),
    });
    const request = {
      _id: id,
      sectionNum: props.sectionNum - 1,
      unitNum: props.unitNum - 1,
    };
    setCurrentUnit(request);
  };
  const handleChecked = (event) => {
    setChecked(event.target.checked);
    const request = {
      _id: id,
      sectionCount: props.sectionNum - 1,
      unitCount: props.unitNum - 1,
      isCompleted: event.target.checked,
    };
    markComplete(request);
  };
  useEffect(() => {
    let type = props.unit.type;
    if (props.unit.isConceptLink) {
      type = "video";
    }
    setType(type);
  }, []);
  const setMain = () => {
    let type = props.unit.type;
    let body;
    let duration = curriculum[props.sectionNum - 1].units[props.unitNum - 1].duration;
    if (props.unit.isConceptLink) {
      type = "video";
      body = props.unit.loId.video.url;
    } else {
      if (type == "video") {
        body = props.unit.video.url;
      } else if (type == "audio") {
        body = props.unit.audio.url;
      } else if (type == "note") {
        body = props.unit.note;
      }
    }
    dispatch(courseActions.setContent({ type, body, duration }));
    setType(type);

    // props.setMain(type, body);
  };

  let isSelected = selectedUnit.section == props.sectionNum - 1 && selectedUnit.unit == props.unitNum - 1;

  React.useEffect(() => {
    // console.log(selectedUnit);
    if (isSelected) {
      setMain();
    }
  }, []);

  return (
    <Grid container spacing={2} alignItems={"center"} className={`single-content ${isSelected && "selected"}`} onClick={handleUnitClick}>
      <Grid item>
        <Checkbox color="primary" lavel="checkbox" checked={checked} onChange={handleChecked} />
      </Grid>
      <Grid item>
        <div className="lecture-name">
          {props.unitNum}. {props.title}
        </div>
        <div className="file-duration-container">
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              {type == "video" && <PlayCircle className="icon" />}
              {type == "audio" && <Audiotrack className="icon" />}
              {type == "note" && <Description className="icon" />}
              {type == "quiz" && <Quiz className="icon" />}
            </Grid>
            <Grid item>{props.duration} min</Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}
