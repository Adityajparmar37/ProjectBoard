import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import { forgotPassword } from "../../Services/studentServices";

export default function Login() {

    const navigate = useNavigate();
    const [params] = useSearchParams();
    const returnUrl = params.get('returnUrl');
    const { student } = useAuth();
    const [message, setMessage] = useState(false);
    const [email, setEmail] = useState({
        email: ''
    })

    useEffect(() => {
        if (!student) return;

        returnUrl ? navigate(returnUrl) : navigate("/home");

    })

    const handleSubmitEmail = async () => {
        try {
            const response = await forgotPassword(email);

            if (response.msg === "You should receive an email") {
                setMessage(true);
                toast.success(response.msg);
            }
            else {
                setMessage(false);
                toast.error("Please try again")
            }
        } catch (error) {
            toast.error("Some Error Occured !");
            console.log("Login Page Frontend Error", error)
        }

    }

    const handleChange = (e) => {
        setEmail({ email: e.target.value });
    };
    return (
        <div className="pt-20 bg-gradient-to-b from-skyBlue-rgba h-screen flex flex-col justify-center items-center">
            <div className="w-full md:w-[25rem] h-2/6 bg-white rounded-xl flex flex-col items-center justify-center p-8">
                <h1 className="font-semibold text-2xl md:text-3xl  text-black">Enter your Email</h1>
                {message && <span className="text-red-600 font-semibold mt-5 mb-3">Reset password link send to your Email</span>}
                <div className="mb-4 mt-4 w-full">
                    <input
                        required
                        type="email"
                        name="email"
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border-2 md:border-b-4 rounded-md outline-none"
                        placeholder="Enter your username"
                    />
                </div>
                <button
                    onClick={handleSubmitEmail}
                    className="w-full bg-blue-700 text-white rounded-md p-2 hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-500 hover:rounded-full mt-3">
                    Get Link
                </button>
            </div>
        </div>
    );
}
