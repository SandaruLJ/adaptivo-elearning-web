import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Accordion.css";
import { Checkbox, Grid } from "@mui/material";
import { PlayCircle } from "@mui/icons-material";
import Unit from "./Unit";
import { useSelector } from "react-redux";

export default function Section(props) {
  const selectedUnit = useSelector((state) => state.course.selectedUnit);
  const [viewedUnits, setViewedUnits] = React.useState();
  const [expanded, setExpanded] = React.useState(selectedUnit.section);
  const curriculum = useSelector((state) => state.course.curriculum);

  React.useEffect(() => {
    console.log("Curriculum change");
    let count = 0;
    curriculum[props.sectionNum - 1].units.map((unit) => {
      if (unit.isCompleted) {
        count++;
      }
    });
    console.log("Section Num = " + props.sectionNum);
    console.log("Count = " + count);
    setViewedUnits(count);
  }, [curriculum]);
  React.useEffect(() => {
    setExpanded(selectedUnit.section);
  }, [selectedUnit.section]);

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
            {viewedUnits} / {props.totalUnits} | {props.sectionDuration}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {props.units.map((unit, index) => {
            return <Unit sectionNum={props.sectionNum} unitNum={index + 1} title={unit.name} duration={6} unit={unit} setMain={props.setMain} selectedUnit={selectedUnit} />;
          })}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
