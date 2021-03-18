//button for user logout

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const LogoutButton = () => {
    //method that clears the application session and redirects to "/v2/logout"
    //endpoint to clear Auth0 session. Process is fairly invisible to user
    const { logout } = useAuth0();
    //returnTo option specifies the URL to redirect user after logout
    //currently to http://localhost:3000
    return (
        <Button 
            className="btn btn-danger"
            onClick={() => logout({
                returnTo: window.location.origin,
            })}>
            Log Out
        </Button>
    );
};

export default LogoutButton;