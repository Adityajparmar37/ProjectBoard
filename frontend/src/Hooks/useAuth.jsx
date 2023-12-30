import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as studentServices from '../Services/studentServices.js'
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [student, setStudent] = useState(studentServices.getUser());


    //login 
    const login = async (loginData) => {
        try {
            const student = await studentServices.login(loginData);
            if (student.success === true) {
                setStudent(student);
                localStorage.setItem("studentInfo", JSON.stringify(student));
                toast.success("Successfully Login !");
                navigate("/home");
            } else {

                if (student.success === false) {
                    toast.error(student.message)
                }

            }
        } catch (error) {
            toast.error("Some Error Occured !");
            console.error("ERROR OCCURED SIGNUP !", error);
        }
    };



    const signup = async (signupData) => {
        try {
            const student = await studentServices.signup(signupData);
            console.log("Student ==>> ", student)
            if (student.success === true) {
                setStudent(student);
                localStorage.setItem("studentInfo", JSON.stringify(student));
                toast.success('Successfully ')
            } else {
                if (student.success === false) {
                    toast.error(student.message);
                }
            }
        } catch (error) {
            toast.error("Some Error Occured !");
            console.log("ERROR OCCURED !", error);
        }
    };


    const logout = () => {
        studentServices.logout();
        setStudent(null);
        navigate("/home");
        toast.success('Logout Successfully !');
    };


    return (
        <AuthContext.Provider value={{ student, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);