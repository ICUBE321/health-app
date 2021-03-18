//to wrap loginButton and logoutButton

import React from "react";

import LoginButton from "./login-button";
import LogoutButton from "./logout-button";

import { useAuth0 } from "@auth0/auth0-react";

const AuthenticationButton = () => {
    //a boolean value, true when Auth0 has authenticated the user and false
    //otherwise
    const { isAuthenticated } = useAuth0();

    return isAuthenticated ? <LogoutButton /> : <LoginButton />;
};

export default AuthenticationButton;