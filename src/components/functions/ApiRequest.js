import axios from "axios";



export const getRequest = (url) => {
    let result = axios.get(url)
    .then((response) => {
        var resData = response.data;
        let data = JSON.stringify(resData);
        window.alert("Response = " + data);
        return resData;
    });
    return result;
}


export const postRequest = (url, data) => {
    let result = axios.post(url, data)
    .then((response) => {
        var resData = response.data;
         // let data = JSON.stringify(resData);
         // window.alert("Response = " + data);
         if (resData.message === "success") {
             return(resData);
         } else {
             return ({
                 message: "fail"
             });
         }
    });
    return result;
}

export const loginRequest = (data) => {
    let validation = axios.post("http://localhost:4000/users/authenticate", data)
    .then((response,error) => {
     var resStatus = response.status
     var resData = response.data;
     if (resStatus === 200) {
        return ({
            status: resStatus,
            id: resData.id,
            username: resData.username,
            firstName: resData.firstName,
            lastName: resData.lastName,
            token: resData.token
            }
        );
    } else {
        return ({
           status: resStatus,
           error: error.response
        }
        );
    }

    })   
    return validation;
}

export const registryRequest = (data) => {
    let validation = axios.post("http://localhost:4000/users/register", data)
    .then((response,error) => {
        var resStatus = response.status
        var resData = response.data;
        if (resStatus === 200) {
            return ({
                status: resStatus,
                username: resData.username,
                firstName: resData.firstname,
                lastName: resData.lastName,
                token: resData.token
            }
        );
        } else {
            return ({
                status: resStatus,
                error: error.response
            });
        }
    })
    return validation;
}