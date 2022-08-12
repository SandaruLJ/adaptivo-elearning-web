import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
import Main from "./pages/Main/Main";
import "@aws-amplify/ui-react/styles.css";
import "../src/styles/authenticator.css";
import { useTracking } from "react-tracking";
import { addActivity } from "./service/activity.service";
import { Auth } from "aws-amplify";
import Home from "./pages/Home/Home";

export const App = () => {
  // const user = useSelector((state) => state.auth.user);
  const [user, setUser] = useState();
  useEffect(() => {
    if (!Auth.currentAuthenticatedUser()) {
      return null;
    }
    
    Auth.currentAuthenticatedUser().then((data) => {
      setUser(data);
    });
  }, []);
  const { Track } = useTracking(
    {
      app: "Elearning-Web",
      user: user && user.attributes.email,
    },
    {
      dispatch: (data) => {
        console.log(data);
        (window.dataLayer = window.dataLayer || []).push(data);
        addActivity(data);
      },
    }
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="main">
          <Track>
            <Main />
          </Track>
        </div>
      </Router>
    </ThemeProvider>
  );

  // return (
  //   <Authenticator className="auth" hideSignUp={true} variation="modal" components={customAuthComponents}>
  //     {({ signOut }) => (
  //       <div className="App">
  //         <ThemeProvider theme={theme}>
  //           <Router>
  //             <NavBar />
  //             <TopBar />
  //             <div className="main">
  //               <Main />
  //               {/* <button onClick={signOut}>Sign out</button> */}
  //             </div>
  //           </Router>
  //         </ThemeProvider>
  //       </div>
  //     )}
  //   </Authenticator>
  // );
};

export default App;
