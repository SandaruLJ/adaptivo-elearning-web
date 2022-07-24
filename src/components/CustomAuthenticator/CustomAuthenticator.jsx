import React, { useEffect } from 'react';

import { Authenticator, View, useTheme, Text, useAuthenticator } from "@aws-amplify/ui-react";
import './CustomAuthenticator.css';

import { useNavigate, useLocation } from 'react-router-dom';

export default function CustomAuthenticator({ initialState }) {
  const { route } = useAuthenticator((context) => [context.route]);
  const location = useLocation();
  const navigate = useNavigate();
  
  let from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (route === 'authenticated') {
      navigate(from, { replace: true });
    }
  }, [route, navigate, from]);
  
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
        placeholder: "Address",
        label: "Address",
        labelHidden: true,
      },
    },
    forceNewPassword: {
      address: {
        isRequired: true,
        placeholder: "Address",
        label: "Address",
        labelHidden: true,
      },
    },
  };
  
  return (
    <Authenticator
      initialState={initialState ? initialState : 'signIn'}
      className="auth"
      variation="modal"
      components={customAuthComponents}
      signUpAttributes={["given_name", "family_name", "phone_number"]}
      formFields={formFields}
    >
    </Authenticator>
  );
}