import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";

export default function Login() {

    const navigate = useNavigate();
    const [params] = useSearchParams();
    const returnUrl = params.get('returnUrl');
    const { student, login } = useAuth();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        if (!student) return;

        returnUrl ? navigate(returnUrl) : navigate("/home");

    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const LoginResponse = await login(form);
            console.log("Student login =>> ", LoginResponse);
        } catch (error) {
            toast.error("Some Error Occured !");
            console.log("Login Page Frontend Error", error)
        }

    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className="pt-20 bg-gradient-to-b from-skyBlue-rgba h-screen flex flex-col justify-center items-center">
            <div className="w-full md:w-[25rem] h-3/6 bg-white rounded-xl flex flex-col items-center justify-center p-8">
                <h1 className="font-semibold text-2xl md:text-3xl  text-black mb-6">Login</h1>
                <form className="w-full">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-500">
                            Email
                        </label>
                        <input
                            required
                            type="email"
                            name="email"
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border-b-2 md:border-b-4 rounded-md outline-none"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-500">
                            Password
                        </label>
                        <input
                            required
                            type="password"
                            name="password"
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border-b-2 md:border-b-4 rounded-md outline-none"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="w-full bg-blue-700 text-white rounded-md p-2 hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-500 hover:rounded-full">
                        Login
                    </button>
                </form>
            </div>

            <div className="w-full md:w-[25rem] h-30 mt-10 bg-white rounded-xl flex flex-col items-center justify-center p-8">
                <h1 className="font-semibold text-2xl md:text-3xl text-black mb-6">Don &apos;t have an account?</h1>
                <Link to="/signup">
                    <button
                        type="button"
                        className="w-full md:w-[20rem] bg-white text-black rounded-md p-2 hover:bg-zinc-200 focus:outline-none focus:ring focus:border-zinc-400 hover:rounded-full border-2 md:border-4">
                        Create account
                    </button>
                </Link>
            </div>
        </div>
    );
}
