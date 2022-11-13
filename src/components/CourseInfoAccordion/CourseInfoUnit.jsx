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

export default function CourseInfoUnit(props) {
  const curriculum = props.curriculum;

  const id = props.id;

  const [type, setType] = useState();
  const dispatch = useDispatch();

  const handleUnitClick = () => {
    setMain();
  };
  useEffect(() => {
    let type = props.unit.type;
    // if (props.unit.isConceptLink) {
    //   type = "video";
    // }
    setType(type);
  }, []);
  const setMain = () => {
    let type = props.unit.type;
    let body;

    if (type == "video") {
      body = props.unit.video.url;
    } else if (type == "audio") {
      body = props.unit.audio.url;
    } else if (type == "note") {
      body = props.unit.note;
    } else if (type == "file") {
      body = props.unit.file.url;
    } else if (type == "visualNote") {
      body = props.unit.visualNote.url;
    } else if (type == "mindmap") {
      body = props.unit.mindmap.url;
    } else if (type == "textRichFile") {
      body = props.unit.textRichFile.url;
    } else if (type == "realExampleVideo") {
      body = props.unit.realExampleVideo.url;
    } else if (type == "realExampleDoc") {
      body = props.unit.realExampleDoc.url;
    } else if (type == "additionalVideo") {
      body = props.unit.additionalVideo.url;
    } else if (type == "additionalMaterials") {
      body = props.unit.additionalMaterials.url;
    }

    props.previewUnit(body);
    setType(type);
  };

  return (
    <Grid container spacing={2} alignItems={"center"} className={`single-content`} onClick={handleUnitClick}>
      <Grid item>
        <div className="lecture-name">
          {props.unitNum}. {props.title}
        </div>
        <div className="file-duration-container">
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              {(type == "video" || type == "realExampleVideo" || type == "additionalVideo") && <PlayCircle className="icon" />}
              {type == "audio" && <Audiotrack className="icon" />}
              {(type == "note" || type == "visualNote" || type == "mindmap" || type == "textRichFile" || type == "realExampleDoc" || type == "additionalMaterials" || type == "file") && (
                <Description className="icon" />
              )}
              {(type == "quiz" || type == "preTest") && <Quiz className="icon" />}
            </Grid>
            <Grid item>{props.duration} min</Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}
