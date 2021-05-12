import axios from "axios";



export const loginRequest = (data) => {
    let validation = axios.post("http://localhost:4000/users/authenticate", data)
    .then((response, error) => {

        console.log("raw response date:\n")
        console.log(response)
        console.log("raw rerrordate:\n")
        console.log(error)
        console.log("\n --------------- \n")
        
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