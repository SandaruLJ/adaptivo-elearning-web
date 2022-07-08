import { DoubleArrow, Email, Facebook, FacebookOutlined, Instagram, PersonPinCircle, Phone, Twitter } from "@mui/icons-material";
import { Grid } from "@mui/material";
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="shape-image shape-8">
        <img src="images/home/shape-8.png" />
      </div>
      <div className="shape-image shape-9">
        <img src="images/home/shape-9.png" />
      </div>
      <Grid container spacing={10}>
        <Grid item md={3}>
          <div className="footer-logo">
            <img src="images/adaptivo.png" />
          </div>
          <div className="footer-description">
            Adaptivo is a personalized dynamic adaptive leaning platform that personalizes the learning path based on each student's learning style and knowledge level
          </div>
          <div className="social-media-icons">
            <div className="social-icon">
              <FacebookOutlined />
            </div>
            <div className="social-icon">
              <Instagram />
            </div>
            <div className="social-icon">
              <Twitter />
            </div>
          </div>
        </Grid>
        <Grid item md={3}>
          <div className="explore-section">
            <div className="footer-section-title">Explore</div>
            <ul className="footer-section-links">
              <li>
                <DoubleArrow fontSize="14" /> About Us
              </li>
              <li>
                <DoubleArrow fontSize="14" /> Testimonial
              </li>
              <li>
                <DoubleArrow fontSize="14" /> Blogs & News
              </li>
              <li>
                <DoubleArrow fontSize="14" /> FAQ Question
              </li>
              <li>
                <DoubleArrow fontSize="14" /> Privacy Policy
              </li>
            </ul>
          </div>
        </Grid>
        <Grid item md={3}>
          <div className="useful-link-section">
            <div className="footer-section-title">Useful Links</div>
            <ul className="footer-section-links">
              <li>
                <DoubleArrow fontSize="14" /> Contact Us
              </li>
              <li>
                <DoubleArrow fontSize="14" /> Pricing Plan
              </li>
              <li>
                <DoubleArrow fontSize="14" /> Popular Courses
              </li>
              <li>
                <DoubleArrow fontSize="14" /> Instructor Profile
              </li>
              <li>
                <DoubleArrow fontSize="14" /> Purchase Guide
              </li>
            </ul>
          </div>
        </Grid>
        <Grid item md={3}>
          <div className="contact-section">
            <div className="footer-section-title">Contact Info</div>
            <ul className="footer-section-links">
              <li>
                <div>
                  <PersonPinCircle fontSize="small" />
                </div>
                <div>23, World Trade Center, Colombo</div>
              </li>
              <li>
                <div>
                  <Phone fontSize="small" />
                </div>
                <div>+94 76 72 32 507</div>
              </li>
              <li>
                <div>
                  <Email fontSize="small" />
                </div>
                <div>info@adaptivo.com</div>
              </li>
            </ul>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default Footer;
