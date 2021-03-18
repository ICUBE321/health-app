//for using composition to make React Router Hooks available to Auth0Provider

import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
    //for Auth0Provider configuration to connect the Auth0 React SDK with
    //the right Auth0 application to process authentication
    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

    //hook used to get history object from React Router
    const history = useHistory();

    //to handle event where Auth0 redirects user from Auth0 Login page to our app
    const onRedirectCallback = (appState) => {
        //to take users back to the route they intended to access before
        //authentication
        history.push(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;