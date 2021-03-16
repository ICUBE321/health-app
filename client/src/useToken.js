//custom hook to store token in sessionStorage
//*sessionStorage only allows data to be saved in a specific window session
//*localStorage saves data even after session ends, but user should logout

import { useState } from "react";

export default function useToken() {
    //fetch the token
    const  getToken = () => {
        //return string value of key in the local storage
        const tokenString = localStorage.getItem('token');
        //convert string to object
        const userToken = JSON.parse(tokenString);
        //return the value of token using chaining operator '?.' to 
        //access token property to ensure its not undefined
        return userToken?.token
    }

    //set the token as the initial state
    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        //save userToken to localStorage 
        localStorage.setItem('token', JSON.stringify(userToken));
        //save token to state
        setToken(userToken.token);
    }

    //return object with token and saveToken set to the setToken property
    //name to give the component the same interface. 
    return {
        setToken: saveToken,
        token
    }
}