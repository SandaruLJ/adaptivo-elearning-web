import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
import Main from "./pages/Main/Main";
import "@aws-amplify/ui-react/styles.css";
import "../src/styles/authenticator.css";
import { useTracking } from "react-tracking";
import { addActivity } from "./service/activity.service";


export const App = () => {
  const { Track } = useTracking(
    {
      app: "Elearning-Web",
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
