import axios from "axios";

export const login = async (loginData) => {
    try {
        const { data } = await axios.post("api/student/login", loginData);
        console.log("Login Frontend API Hit ==> ", data);
        return data;
    } catch (error) {
        return error.response.data;
    }
}


export const signup = async (signupData) => {
    try {
        const { data } = await axios.post('api/student/signup', signupData);
        console.log("Signup Frontend API Hit ==> ", data);
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const ProfileUpdate = async (formData) => {
    try {
        const { data } = await axios.put('api/student/profile/update', formData);
        console.log("Update Profile Frontend API Hit ==> ", data);
        return data;
    } catch (error) {
        return error.response.data;
    }
}



export const getUser = () =>
    localStorage.getItem('studentInfo')
        ? JSON.parse(localStorage.getItem('studentInfo'))
        : null;


export const logout = () => {
    localStorage.removeItem('studentInfo');
    // localStorage.removeItem('cart');
    document.title = 'Project Board !'
};