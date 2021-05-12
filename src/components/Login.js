import "./Login.css";

import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { loginRequest, registryRequest } from "./functions/ApiRequest";
import Jobplatform from "./Jobplatform"
import FormLabel from "react-bootstrap/esm/FormLabel";
//import { GetUser } from "../sections/Users";

const Login = () => {
    const [passdata, setPassdata] = useState("");
    const [user_id, setUser_Id] = useState(0);
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [dUsername, setDUsername] = useState("");
    const [password, setPassword] = useState("");
    const [dPassword, setDPassword] = useState("");
    const [alert, setAlert] = useState("");
    const [info, setInfo] = useState("");

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }
    function validateRegistry() {
        return dUsername.length > 0 && dPassword.length > 5 && firstname.length > 0 && lastname.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("login attempt")
        var requestData = {
            "username": username,
            "password": password
        };
        console.log(requestData)
        var res = await loginRequest(requestData);
        console.log(res)
        if (res.status === 200) {
            setIsLoggedIn(true)
            setUser_Id(res.message.id)
            console.log(res.message)
            setAlert("")
            setPassdata(res.message)
        } else {
            setAlert("Username or Password incorrect.")
        }

    }

    async function registrationSubmit(event) {
        event.preventDefault();
        console.log("registration attempt")
        var requestData = {
            "firstName": firstname,
            "lastName": lastname,
            "username": dUsername,
            "password": dPassword
        }
        console.log(requestData);
        var res = await registryRequest(requestData);
        console.log(res)
        if (res.status === 200) {
            setPassdata(res.message)
            setInfo("Account created successfully, please login.")
        } else {
            setAlert("Error, Username is alrady in use.");
        }
    }
    if (isLoggedIn === false) {
        return (
            <div className="Login">
                <Form onSubmit={handleSubmit}>
                    <h1>Odd Job Platform</h1>
                    <h4>Sign in to the Odd Job Platform here:</h4>
                    <Form.Group size="lg" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control autoFocus type="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button block size="lg" type="submit" disabled={!validateForm()}>
                        Login
                </Button>
                    <h5 style={{
                        color: "orangered",
                    }}>{alert}</h5>
                </Form>
                <Form onSubmit={registrationSubmit}>
                    <h4>Or register as a new User for the Job Platform:</h4>
                    <Form.Group size="lg" controllId="firstname">
                        <FormLabel>First Name</FormLabel>
                        <Form.Control type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                    </Form.Group>
                    <Form.Group size="lg" controllId="lastname">
                        <FormLabel>Last Name</FormLabel>
                        <Form.Control type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                    </Form.Group>
                    <Form.Group size="lg" controllId="checkusername">
                        <FormLabel>Username</FormLabel>
                        <Form.Control type="username" value={dUsername} onChange={(e) => setDUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group size="lg" controllId="checkpassword">
                        <FormLabel>Password</FormLabel>
                        <Form.Control type="password" value={dPassword} onChange={(e) => setDPassword(e.target.value)} />
                        <h6>min. 6 characters</h6>
                    </Form.Group>
                    <Button block size="lg" type="submit" disabled={!validateRegistry()}>
                        Register
                </Button>
                <div>{info}</div>
                </Form>
                <h5 style={{
                    color: "orangered",
                }}>{alert}</h5>
            </div>
        )
    } else {
        return (
            <div>
                <div>{Jobplatform(passdata)}</div>
                <br></br>
                <hr></hr>
                <br></br>
                <Button block size="lg" onClick={() => setIsLoggedIn(false)}>Logout</Button>
            </div>

        )
    }
}

export default Login;