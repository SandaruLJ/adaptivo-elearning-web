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

export default function Unit(props) {
  const selectedUnit = useSelector((state) => state.course.selectedUnit);
  const [type, setType] = useState();
  const dispatch = useDispatch();

  const handleUnitClick = () => {
    dispatch(courseActions.setSelectedUnit({ section: props.sectionNum - 1, unit: props.unitNum - 1 }));
    setMain();
    dispatch(courseActions.setNextUnit());
  };

  useEffect(() => {
    let type = props.unit.type;
    if (props.unit.isConceptLink) {
      type = "video";
    }
    setType(type);
  });
  const setMain = () => {
    let type = props.unit.type;
    let body;
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
    dispatch(courseActions.setContent({ type, body }));
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
        <Checkbox color="primary" lavel="checkbox" />
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
