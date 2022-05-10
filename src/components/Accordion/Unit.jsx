import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Accordion.css";
import { Checkbox, Grid } from "@mui/material";
import { PlayCircle } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { courseActions } from "../../store/course-slice";

export default function Unit(props) {
  const selectedUnit = useSelector((state) => state.course.selectedUnit);
  const dispatch = useDispatch();

  const handleUnitClick = () => {
    dispatch(courseActions.setSelectedUnit({ section: props.sectionNum - 1, unit: props.unitNum - 1 }));

    props.setMain({
      type: props.unit.type,
      body: props.unit.video.url,
    });
  };
  React.useEffect(() => {
    console.log(selectedUnit);
  }, [selectedUnit]);

  const isSelected = selectedUnit.section == props.sectionNum - 1 && selectedUnit.unit == props.unitNum - 1;

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
              <PlayCircle className="icon" />
            </Grid>
            <Grid item>{props.duration} min</Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}
