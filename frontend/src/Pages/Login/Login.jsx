import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import { useLoading } from "../../Hooks/useLoading";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const navigate = useNavigate();
  const { showLoading, hideLoading } =
    useLoading();
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl");
  const { student, login, GoogleAuthLogin } =
    useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!student) return;

    returnUrl
      ? navigate(returnUrl)
      : navigate("/home");
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      showLoading();
      const LoginResponse = await login(form);
      hideLoading();
      console.log(
        "Student login =>> ",
        LoginResponse
      );
    } catch (error) {
      hideLoading();
      toast.error("Some Error Occured !");
      console.log(
        "Login Page Frontend Error",
        error
      );
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleAuth = async () => {
    try {
      // window.location.href = `http://localhost:3000/auth/google/callback`;

      const response = await GoogleAuthLogin();
      console.log(response);
    } catch (err) {
      toast.error(
        err?.data?.message || err.error
      );
    }
  };

  return (
    <div className="pt-20 bg-gradient-to-b from-skyBlue-rgba h-screen flex flex-col justify-center items-center">
      <div className="w-full md:w-[25rem] h-4/6 bg-white rounded-xl flex flex-col items-center justify-center p-8">
        <h1 className="font-semibold text-2xl md:text-3xl  text-black mb-6">
          Login
        </h1>
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
              className="mt-1 p-2 w-full border-b-2 md:border-b-4 rounded-md outline-none focus:border-2"
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
              className="mt-1 p-2 w-full border-b-2 md:border-b-4 rounded-md outline-none focus:border-2"
              placeholder="Enter your password"
            />
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full bg-blue-700 text-white rounded-md p-2 hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-500 hover:rounded-full mt-3">
            Login
          </button>

          <div className="flex justify-center items-center mt-5 text-slate-900">
            <p className="mr-2">
              Forgot Password ?
            </p>
            <Link to="/forgotPassword">
              <span className="text-red-600 font-semibold">
                Click here
              </span>
            </Link>
          </div>
          <h1 className="font-light text-center my-1">
            -- OR --
          </h1>
          <div className="flex justify-center items-center mt-3">
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full bg-transparent text-black rounded-md p-2 hover:bg-gray-100 focus:outline-none focus:ring focus:border-gray-400 duration-300 hover:border-none hover:rounded-full mt-3 flex justify-center items-center text-center gap-5 border-2">
              <FcGoogle /> Sign in with Google
            </button>
          </div>
        </form>
      </div>

      <div className="w-full md:w-[25rem] h-30 mt-10 bg-white rounded-xl flex flex-col items-center justify-center p-8">
        <h1 className="font-semibold text-2xl md:text-3xl text-black mb-6">
          Don &apos;t have an account?
        </h1>
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
