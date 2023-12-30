import axios from "axios";

axios.interceptors.request.use(req => {

    const student = localStorage.getItem('studentInfo');
    const token = student && JSON.parse(student).token;
    console.log("token => " , token)

    if (token) {
        req.headers['access_token'] = token;
    }

    return req;
},

    error => {
        return Promise.reject(error);
    }
);