import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import './login.css'

//function to login the user and call fecth method using POST option
async function loginUser(credentials) {
    return fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function Login({setToken}) {
    //local state to capture username and password
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    //submit handler to call loginUser with username and password, 
    //call setToken upon successful result
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        setToken(token);
    }

    return(
        <Form onSubmit={handleSubmit}>
            <h1>Please Log In</h1>
            <Form.Group>
                <Form.Label>Health Card Number</Form.Label>
                <Form.Control type="text" placeholder="Enter health card number" onChange={e => setUserName(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form.Group>
            <Form.Group>
                <Button variant="primary">
                    Register
                </Button>
            </Form.Group>
        </Form>
    )
}

//add in PropType from the new prop and destructure the props object to pull out setToken prop
Login.propTypes = {
    setToken: PropTypes.func.isRequired
}