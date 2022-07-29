import React from "react";

import { BrowserRouter as Router, Redirect, Route, Routes } from "react-router-dom";

import "./Main.css";
import ViewCourse from "../ViewCourse/ViewCourse";
import { useSelector } from "react-redux";
import { useTracking } from "react-tracking";
import Home from "../Home/Home";
import MyCourses from "../MyCourses/MyCourses";

const Main = () => {
  const user = useSelector((state) => state.auth.user);
  const { Track, trackEvent } = useTracking({ user: user.attributes.email });

  return (
    <Track>
      <Routes>
        <Route exact path="/home" element={<Home />}></Route>
        <Route exact path="/course/:id" element={<ViewCourse />}></Route>
        <Route exact path="/" element={<MyCourses />}></Route>

        {/* <Route exact path="/add/courses" element={<AddCourse />}></Route>
      <Route exact path="/courses" element={<AllCourse />}></Route>
      <Route exact path="/qna" element={<AddQuestion />}></Route>
      <Route exact path="/users" element={<AddUser />}></Route>
      <Route exact path="/categories/add" element={<AddCategory />}></Route>
      <Route exact path="/categories" element={<AllCategory />}></Route> */}
      </Routes>
    </Track>
  );
};
export default Main;
