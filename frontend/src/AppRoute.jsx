import { Routes, Route } from "react-router-dom";
import DefaultPage from "./Pages/DefaultPage/DefaultPage";
import HomePage from "./Pages/HomePage/HomePage";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/Signup/SignUp";
import { Toaster } from 'react-hot-toast';
import AuthRoute from "./Components/AuthRoute/AuthRoute";
import ProjectPage from "./Pages/ProjectPage/ProjectPage";

export default function AppRoute() {
    return (
        <>
            <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<DefaultPage />} />

                <Route path="/home" element={<AuthRoute>
                    <HomePage />
                </AuthRoute>} />

                <Route path="/project" element={<AuthRoute>
                    <ProjectPage />
                </AuthRoute>} />
            </Routes>
        </>
    )
}
