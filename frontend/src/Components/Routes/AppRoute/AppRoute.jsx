import { Routes, Route } from "react-router-dom";
import DefaultPage from "../../../Pages/DefaultPage/DefaultPage";
import HomePage from "../../../Pages/HomePage/HomePage";
import Login from "../../../Pages/Login/Login";
import SignUp from "../../../Pages/Signup/SignUp";
import { Toaster } from 'react-hot-toast';
import AuthRoute from "../AuthRoute/AuthRoute";
import ProjectPage from "../../../Pages/ProjectPage/ProjectPage";
import CreateProject from "../../CreateProject/CreateProject";
import ManageProject from "../../ManageProject/ManageProject";
import ProjectView from "../../../Pages/ProjectView/ProjectView";

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

                <Route path="/createProject" element={<AuthRoute>
                    <CreateProject />
                </AuthRoute>} />

                <Route path="/manageProject" element={<AuthRoute>
                    <ManageProject />
                </AuthRoute>} />

                <Route path="/manageProject/:id" element={<AuthRoute>
                    <ProjectView />
                </AuthRoute>}/>

            </Routes>
        </>
    )
}
