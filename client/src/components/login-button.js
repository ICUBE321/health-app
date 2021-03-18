//login button to trigger user login

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const LoginButton = () => {
    //method that prompts a user to authenticate and provide consent for
    //our app to access certain data on behalf of the user
    //app redirects user to Auth0 login page to authenticate
    const { loginWithRedirect } = useAuth0();
    return (
        <Button 
            className="btn btn-primary"
            onClick={() => loginWithRedirect()}>
            Log In
        </Button>
    );
};

export default LoginButton;