import React from "react";

import { BrowserRouter as Router, Redirect, Route, Routes } from "react-router-dom";

import "./Main.css";
import ViewCourse from "../ViewCourse/ViewCourse";
import { useSelector } from "react-redux";
import { useTracking } from "react-tracking";
import Home from "../Home/Home";
import CustomAuthenticator from "../../components/CustomAuthenticator/CustomAuthenticator";
import { RequireAuth } from "../../components/CustomAuthenticator/RequireAuth";
import { Authenticator } from "@aws-amplify/ui-react";

const Main = () => {
  const user = useSelector((state) => state.auth.user);
  const { Track, trackEvent } = useTracking({ user: user.attributes && user.attributes.email });

  return (
    <Authenticator.Provider>
      <Track>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>

          <Route
            exact path="/course"
            element={
              <RequireAuth>
                <ViewCourse />
              </RequireAuth>
            }
          />

          {/* <Route exact path="/add/courses" element={<AddCourse />}></Route>
        <Route exact path="/courses" element={<AllCourse />}></Route>
        <Route exact path="/qna" element={<AddQuestion />}></Route>
        <Route exact path="/users" element={<AddUser />}></Route>
        <Route exact path="/categories/add" element={<AddCategory />}></Route>
        <Route exact path="/categories" element={<AllCategory />}></Route> */}

          <Route path="/login" element={<CustomAuthenticator />} />
        </Routes>
      </Track>
    </Authenticator.Provider>
  );
};
export default Main;
