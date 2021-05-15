import "./Login.css";

import React, { Component, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { loginRequest, registryRequest, jobRequest, jobAddRequest } from "./functions/ApiRequest";

import FormLabel from "react-bootstrap/esm/FormLabel";
import { JsonToTable } from "react-json-to-table";

const Login = () => {
    const [jobName, setJobname] = useState("");
    const [jobDescription, setDescription] = useState("");
    const [jobLocation, setLocation] = useState("");
    const [jobDate, setJobdate] = useState("");
    const [user, setUser] = useState("");
    const [displaydata, setDisplayData] = useState("");
    const [jwtoken, setjwtoken] = useState("");
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
    function validateNewJob() {
        return jobName.length > 0 && jobDescription.length > 0 && jobLocation.length > 0 && jobDate.length > 0;
    }
    async function handleSubmit(event) {
        event.preventDefault();
        var requestData = {
            "username": username,
            "password": password
        };

        console.log(requestData)
        var res = await loginRequest(requestData);
        if (res.status === 200) {
            console.log("resdata is")
            console.log(res)
            setIsLoggedIn(true)
            setjwtoken(res.token)
            setAlert("")
            setUser(res.message)
        } else {
            setAlert("Username or Password incorrect.")
        }

    }

    async function getJobHandler(event) {
        event.preventDefault();
        var requestData = jwtoken
        console.log(requestData)
        var res = await jobRequest(requestData)
        console.log(res)
        if (res.status === 200) {
            setDisplayData(res.message)
        }
        else {
            setAlert("Error fetching obs")
        }

    }
    async function jobSubmit(event) {
        event.preventDefault();
        console.log("job creation attempt")
        var requestData = {
            "jobName": jobName,
            "jobDescription": jobDescription,
            "jobLocation": jobLocation,
            "jobDate": jobDate,
        }
        var token = jwtoken
        console.log(requestData);
        console.log(token);
        var res = await jobAddRequest(requestData, token);
        console.log(res)
        if (res.status === 200) {
            setInfo("Job created successfully, please login.")
        } else {
            setAlert("Error, Job could not be created");
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
            setInfo("Account created successfully, please login.")
        } else {
            setAlert("Error, Username is alrady in use.");
        }
    }
    if (isLoggedIn === false) {
        return (
            <div className="Login">
                <Form onSubmit={handleSubmit}>
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
                <hr></hr>
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
            <div className="Logout">
                <h1>Jobs</h1>

                <div>
                    <h4 style={{ color: "orangered", }}>Currently logged in:</h4>
                    <JsonToTable json={user} />
                </div>
                <br></br>
                <h3 style={{ color: "orangered", }}>These jobs are currently offered:</h3>
                <br></br>
                <Button onClick={getJobHandler}>Get Jobs</Button>

                <JsonToTable json={displaydata} />
                <br></br>
                <hr></hr>
                <br></br>
                <Form onSubmit={jobSubmit}>
                    <h4>Or add a new Job:</h4>
                    <Form.Group size="lg" controllId="firstname">
                        <FormLabel>Job Name</FormLabel>
                        <Form.Control type="text" value={jobName} onChange={(e) => setJobname(e.target.value)} />
                    </Form.Group>
                    <Form.Group size="lg" controllId="lastname">
                        <FormLabel>Job Description</FormLabel>
                        <Form.Control type="text" value={jobDescription} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group size="lg" controllId="checkusername">
                        <FormLabel>Location</FormLabel>
                        <Form.Control type="username" value={jobLocation} onChange={(e) => setLocation(e.target.value)} />
                    </Form.Group>
                    <Form.Group size="lg" controllId="checkpassword">
                        <FormLabel>Job Date</FormLabel>
                        <Form.Control type="text" value={jobDate} onChange={(e) => setJobdate(e.target.value)} />
                    </Form.Group>
                    <Button block size="lg" type="submit" disabled={!validateNewJob()}>
                        Add Job
                </Button>
                    <div>{info}</div>
                </Form>
                <br></br>
                <Button block size="lg" onClick={() => setIsLoggedIn(false)}>Logout</Button>


            </div>

        )
    }
}

export default Login;