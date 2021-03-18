//button for signing up users

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const SignupButton = () => {
    //method that prompts a user to authenticate and provide consent for
    //our app to access certain data on behalf of the user
    //app redirects user to Auth0 login page to authenticate
    const { loginWithRedirect } = useAuth0();
    //make user land on a sign-up page by specifying "screen_hint"
    //property in "loginWithRedirect()" configuration object
    return (
        <Button 
            className="btn btn-primary"
            onClick={() => loginWithRedirect({
                screen_hint: "signup",
            })}>
            Sign Up
        </Button>
    );
};

export default SignupButton;