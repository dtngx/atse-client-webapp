import "./Jobplatform.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { deleteRequest } from "./functions/ApiRequest";


function deleteHandler() {
    console.log("not implemented")
}

const Jobplatform = (data) => {

    console.log(data)

    return (

        <div>
            <h1>New Platform Page</h1>
            <h3>These jobs are currently offered:</h3>
            <br></br>


            <br></br>
            
            <div style={{
                        color: "orangered",
                    }}>
                        <h4>Currently logged in:</h4>
                <div>Username:</div>
                <div>{data.username}</div>
                <div>First Name:</div>
                <div>{data.firstName}</div>
                <div>Last Name:</div>
                <div>{data.lastName}</div>
            </div>
            <h4>This is the current JWT:</h4>
            <div>{data.token}</div>
            <div>
            <Form onSubmit={deleteHandler}>

                    <h4 style={{ color: "orangered"}}>Delete is not implemented:</h4>
                    
                    <Button block size="lg" type="submit">
                        Delete User
                </Button>
                    <h5 style={{
                        color: "orangered",
                    }}>{alert}</h5>
                </Form>
            </div>
        </div>
    )

};

export default Jobplatform;
