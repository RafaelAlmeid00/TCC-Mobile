// createContext.js
import React from 'react';
import { interfaceUserData } from '../../interfaces/userInterface';

const UserContext = React.createContext<{
    userContext: interfaceUserData;
    setUserContext: React.Dispatch<React.SetStateAction<interfaceUserData>>;
    token: string,
    setToken: React.Dispatch<React.SetStateAction<string>>;
  }>({
    userContext: {} as interfaceUserData,
    setUserContext: () => {}, 
    token: '',
    setToken: () => {}
  });
const SignUpContext = React.createContext<{
    signUpContext: interfaceUserData;
    setSignUpContext: React.Dispatch<React.SetStateAction<interfaceUserData>>;
  }>({
    signUpContext: {} as interfaceUserData,
    setSignUpContext: () => {}, 
  });
  

export { UserContext, SignUpContext };
