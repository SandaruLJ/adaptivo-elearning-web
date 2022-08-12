import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Accordion.css";
import { Checkbox, Grid } from "@mui/material";
import { PlayCircle } from "@mui/icons-material";
import Section from "./Section";

export default function CustomAccordion(props) {
  return (
    <div className="accordion">
      {props.curriculum.map((section, index) => {
        return <Section title={section.name} key={index} sectionNum={index + 1} viewedUnits={3} totalUnits={section.units.length} sectionDuration={"15 min"} units={section.units} />;
      })}
      {/* <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <div className="section-title">Section 1: Introduction</div>

          <div className="section-title-caption">3 / 4 | 15 min</div>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} alignItems={"center"} className="single-content">
            <Grid item>
              <Checkbox color="primary" lavel="checkbox" />
            </Grid>
            <Grid item>
              <div className="lecture-name">1. Course Outline</div>
              <div className="file-duration-container">
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <PlayCircle className="icon" />
                  </Grid>
                  <Grid item>6 min</Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
}
