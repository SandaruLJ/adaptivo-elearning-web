import { Grid } from "@mui/material";
import React from "react";
import "./Testimonials.css";

const Testimonials = () => {
  return (
    <div className="testimonials">
      <div className="shape-image shape-10">
        <img src="images/home/shape-10.png" />
      </div>
      <Grid container alignItems={"center"} spacing={4}>
        <Grid item md={5}>
          <div className="circle-image-wrapper">
            <img src="images/home/client-banner-left.jpg" className="testimonials-banner" />
            <div className="circle-image">
              <span></span>
              <span></span>
            </div>
          </div>
        </Grid>
        <Grid item md={7}>
          <div className="testimonial-feedback-section">
            <div className="testimonial-text">TESTIMONIAL</div>
            <div className="student-feedback-title">Our Students Feedback</div>
            <div className="feedback">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
              was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
            </div>
            <div className="feedback-student-name">Rishard Akram</div>
            <div className="feedback-student-designation">Grade 12 Student</div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Testimonials;
