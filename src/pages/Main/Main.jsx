import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Redirect, Route, Routes } from "react-router-dom";

import "./Main.css";
import ViewCourse from "../ViewCourse/ViewCourse";
import { useSelector } from "react-redux";
import { useTracking } from "react-tracking";
import Home from "../Home/Home";
import MyCourses from "../MyCourses/MyCourses";
import CustomAuthenticator from "../../components/CustomAuthenticator/CustomAuthenticator";
import { RequireAuth } from "../../components/CustomAuthenticator/RequireAuth";
import { Authenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import CourseInfo from "../CourseInfo/CourseInfo";
import ViewLearningStyle from "../ViewLearningStyle/ViewLearningStyle";
import Profile from "../Profile/Profile";

const Main = () => {
  const { Track, trackEvent } = useTracking();

  return (
    <Authenticator.Provider>
      <Track>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>

          <Route
            exact
            path="/mycourses"
            element={
              <RequireAuth>
                <MyCourses />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/course/:id"
            element={
              <RequireAuth>
                <ViewCourse />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />

          <Route path="/login" element={<CustomAuthenticator initialState="signIn" />} />
          <Route path="/signup" element={<CustomAuthenticator initialState="signUp" />} />
          <Route path="/course-info/:id" element={<CourseInfo />} />
        </Routes>
      </Track>
    </Authenticator.Provider>
  );
};
export default Main;
