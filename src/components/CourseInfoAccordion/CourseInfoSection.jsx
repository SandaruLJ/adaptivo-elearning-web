import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Accordion.css";
import { Checkbox, Grid } from "@mui/material";
import { PlayCircle } from "@mui/icons-material";
import { useSelector } from "react-redux";
import CourseInfoUnit from "./CourseInfoUnit";

export default function CourseInfoSection(props) {
  const [expanded, setExpanded] = React.useState(0);
  const curriculum = props.curriculum;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className="accordion">
      {/* defaultExpanded={selectedUnit.section == props.sectionNum - 1} */}
      <Accordion expanded={expanded === props.sectionNum - 1} onChange={handleChange(props.sectionNum - 1)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <div className="section-title">
            Section {props.sectionNum}: {props.title}
          </div>
          <div className="section-title-caption">
            {props.totalUnits} units | {props.sectionDuration}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {props.units.map((unit, index) => {
            return <CourseInfoUnit sectionNum={props.sectionNum} unitNum={index + 1} title={unit.name} duration={6} unit={unit} setMain={props.setMain} />;
          })}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
