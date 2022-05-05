import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
import Main from "./pages/Main/Main";
import TopBar from "./components/TopBar/TopBar";
import { Amplify } from "aws-amplify";
import { Authenticator, View, useTheme, Text } from "@aws-amplify/ui-react";
import awsExports from "./aws-exports";
import "@aws-amplify/ui-react/styles.css";
import "../src/styles/authenticator.css";
import store from './store';
import { authActions } from './store/auth-slice';

Amplify.configure(awsExports);

function App() {
  const customAuthComponents = {
    Header() {
      const { tokens } = useTheme();

      return (
        <View textAlign="center" padding={tokens.space.zero} className="auth-screen-logo">
          <Text className="auth-screen-logo-text">Elearning</Text>
        </View>
      );
    },
  };

  const formFields = {
    signUp: {
      address: {
        isRequired: true,
        placeholder: 'Address',
        label: 'Address',
        labelHidden: true
      }
    },
    forceNewPassword: {
      address: {
        isRequired: true,
        placeholder: 'Address',
        label: 'Address',
        labelHidden: true
      }
    }
  }

  return (
    <Authenticator className="auth"
      variation="modal"
      components={customAuthComponents}
      signUpAttributes={[
        'given_name',
        'family_name',
        'phone_number'
      ]}
      formFields={formFields}
    >
      {({ signOut, user }) => {
        const userObject = JSON.parse(JSON.stringify(user))
        let role = ''
        if (userObject.pool.userPoolId === 'ap-south-1_RURl3ClP1') {
          role = 'student'
        }
        userObject.role = role;
        store.dispatch(authActions.setUser(userObject));
        
        return (
          <ThemeProvider theme={theme}>
            <Router>
              <TopBar signOut={signOut} />
              <div className="main">
                <Main />
              </div>
            </Router>
          </ThemeProvider>
        )
      }}
    </Authenticator>
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
}

export default App;
