import { Grid } from "@mui/material";
import moment from "moment";
import React, { useEffect } from "react";
import { useTracking } from "react-tracking";
import CustomButton from "../../components/Button/CustomButton";
import CategoriesSection from "../../components/CategoriesSection/CategoriesSection";
import CourseSection from "../../components/CourseSection/CourseSection";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import SubBanner from "../../components/SubBanner/SubBanner";
import Testimonials from "../../components/Testimonials/Testimonials";
import "./Home.css";
import PreferenceDialog from "../../components/Dialog/PreferenceDialog";
import { getLearningStylesByUser } from "../../service/learningStyles.service";
import { useState } from "react";
import { Auth } from "aws-amplify";

const Home = () => {
  const { trackEvent } = useTracking({ page: "home" });
  const [displayPreference, setDisplayPreference] = useState(true);

  useEffect(async () => {
    Auth.currentAuthenticatedUser()
      .then(async (data) => {
        const learningStyle = await getLearningStylesByUser(data.attributes.email);
        if (learningStyle.hasOwnProperty("msg")) {
          // setDisplayPreference(true);
        }
      })
      .catch(() => {
        // setDisplayPreference(false);
      });
    trackEvent({
      action: "page_visit_home",
      time: moment().format("DD-MM-YYYY hh:mm:ss"),
    });
  }, []);
  return (
    <div className="home">
      <div className="header-container">
        <Header />
      </div>
      <div className="hero-image">
        <div className="hero-container">
          <div className="container">
            <Grid container justifyContent={"space-around"}>
              <Grid item lg={6}>
                <h1 className="title">Welcome to the future of Learning</h1>
                <p className="description">Adaptivo provides a personalized dynamic learning experience to each student based on their learning style and knowledge level</p>
                <div className="mt-3">
                  <CustomButton name="Explore Courses" color="orange explore-courses-btn" />
                </div>
              </Grid>
              <Grid item lg={6}>
                <div className="banner-images">
                  <div className="banner-main-image">
                    <img src="/images/home/image-01.png" className="img-01" />
                  </div>
                  <img src="/images/home/image-02.png" className="img-02" />
                  <img src="/images/home/image-03.png" className="img-03" />
                </div>
              </Grid>
            </Grid>
            <div className="shape-wrapper">
              <div className="shape-dot-wrapper">
                <div className="shape-image shape-1">
                  <img src="/images/home/shape-1.png" />
                </div>
                <div className="shape-image shape-2">
                  <img src="/images/home/shape-2.png" />
                </div>
                <div className="shape-image shape-3">
                  <img src="/images/home/shape-3.png" />
                </div>
                <div className="shape-image shape-4">
                  <img src="/images/home/shape-4.png" />
                </div>
                <div className="shape-image shape-5">
                  <img src="/images/home/shape-5.png" />
                </div>
                <div className="shape-image shape-6">
                  <img src="/images/home/shape-6.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sub-banner-container">
        <Grid container spacing={6} alignItems="center" justifyContent={"center"}>
          <Grid item>
            <SubBanner image={"images/home/businessman.png"} title="Personalized Content" description="Content will be personalized based on your learning style and knowledge level" />
          </Grid>
          <Grid item>
            <SubBanner image={"images/home/rating.png"} title="Expert Instructors" description="Learn from qualified expert instructors" />
          </Grid>
          <Grid item>
            <SubBanner image={"images/home/key.png"} title="Life Time Access" description="All courses will be available for life time. You can learn at your own pace." />
          </Grid>
        </Grid>
      </div>
      <div className="shape-image shape-7">
        <img src="images/home/shape-7.png" />
      </div>
      <div className="trending-courses">
        <CourseSection title="Most Trending Courses" />
      </div>
      <div className="shape-image shape-8">
        <span className="shape-dot" />
      </div>
      <div className="explore-categories">
        <CategoriesSection />
      </div>
      <div className="shape-image shape-11">
        <img src="/images/home/shape-11.png" />
      </div>
      <div className="popular-courses mt-3">
        <CourseSection title="Most Popular Courses" />
      </div>
      <div className="testimonials-section">
        <Testimonials />
      </div>
      <div className="footer-section">
        <Footer />
      </div>
      {displayPreference && <PreferenceDialog />}
    </div>
  );
};
export default Home;
