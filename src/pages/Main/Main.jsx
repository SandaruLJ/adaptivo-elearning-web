import React from "react";

import { BrowserRouter as Router, Redirect, Route, Routes } from "react-router-dom";

import "./Main.css";
import ViewCourse from "../ViewCourse/ViewCourse";

const Main = () => {
  return (
    <Routes>
      <Route exact path="/" element={<ViewCourse />}></Route>
      {/* <Route exact path="/add/courses" element={<AddCourse />}></Route>
      <Route exact path="/courses" element={<AllCourse />}></Route>
      <Route exact path="/qna" element={<AddQuestion />}></Route>
      <Route exact path="/users" element={<AddUser />}></Route>
      <Route exact path="/categories/add" element={<AddCategory />}></Route>
      <Route exact path="/categories" element={<AllCategory />}></Route> */}
    </Routes>
  );
};
export default Main;
