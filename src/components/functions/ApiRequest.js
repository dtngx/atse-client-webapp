import axios from "axios";



export const loginRequest = (data) => {
    let validation = axios.post("http://localhost:4000/users/authenticate", data)
    .then((response, error) => {

        console.log("raw response data for Login:\n")
        console.log(response)

        
     var resStatus = response.status;
     var resData = response.data;

    if (error) {
        throw "error"
    }
        return ({
            status: resStatus,
            message: resData,
            token: resData.token
        })
    });
    return validation;
}

export const registryRequest = (data) => {
    let validation = axios.post("http://localhost:4000/users/register", data)
    .then((response) => {

        console.log("raw response data for Registry:\n")
        console.log(response.data)
        console.log("\n --------------- \n")

        var resStatus = response.status
        var resMessage = response.data.message;
        
            return ({
                status: resStatus,
                message: resMessage
            }
        );
                
    })
    return validation;
}

export const jobAddRequest = (data, token) => {
    let validation = axios.post("http://localhost:4000/jobs/add", data, {
        headers: { Authorization: `Bearer ${token}` }})
    .then((response) => {

        console.log("raw response data for Adding Job:\n")
        console.log(response.data)
        console.log("\n --------------- \n")

        var resStatus = response.status
        var resMessage = response.data.message;
        
            return ({
                status: resStatus,
                message: resMessage
            }
        );
                
    })
    return validation;
}


export const jobRequest = (token) => {
    
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    console.log("Data sent")
    console.log(token)
    let validation = axios.get("http://localhost:4000/jobs/jobs", config)
    .then((response) => {

        console.log("raw response data:\n")
        console.log(response)
        console.log("\n --------------- \n")

        var resStatus = response.status
        var resMessage = response.data;
        
            return ({
                status: resStatus,
                message: resMessage
            }
        );
                
    })
    return validation;
}





/* export const deleteRequest = (data) => {
    let validation = axios.post("http://localhost:4000/users/register", data)
    .then((response) => {

        console.log("raw response date:\n")
        console.log(response)
        console.log("\n --------------- \n")

        var resStatus = response.status
        var resMessage = response.data.message;
        
            return ({
                status: resStatus,
                message: resMessage
            }
        );
                
    })
    return validation;
} */