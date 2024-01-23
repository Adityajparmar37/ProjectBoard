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
import ChatPage from "../../../Pages/ChatPage/ChatPage";
import SearchMember from "../../SearchMember/SearchMember";
import TaskPage from "../../../Pages/TaskPage/TaskPage";
import CreateTask from "../../CreateTask/CreateTask";
import ManageTask from "../../ManageTask/ManageTask";
import TaskView from "../../../Pages/TaskView/TaskView";
import Calendar from "../../Calendar/Calendar";
import FilePage from "../../../Pages/FilePage/FilePage";
import UploadFile from "../../UploadFile/UploadFile";
import ManageFile from "../../ManageFile/ManageFile";
import Chatting from "../../Chatting/Chatting";
import ProfilePage from "../../../Pages/ProfilePage/ProfilePage";
import ForgotPassword from "../../../Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../../Pages/ResetPassword/ResetPassword";

export default function AppRoute() {
    return (
        <>
            <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<DefaultPage />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/api/student/newPassword/:id/:token" element={<ResetPassword />} />

                {/* main pages */}
                <Route path="/home" element={<AuthRoute>
                    <HomePage />
                </AuthRoute>} />
                <Route path="/project" element={<AuthRoute>
                    <ProjectPage />
                </AuthRoute>} />
                <Route path="/chat" element={<AuthRoute>
                    <ChatPage />
                </AuthRoute>} />
                <Route path="/profile" element={<AuthRoute>
                    <ProfilePage />
                </AuthRoute>} />


                {/* Chat section nae routes */}
                <Route path="/chat/find" element={<AuthRoute>
                    <SearchMember />
                </AuthRoute>} />
                <Route path="/chat/chatting" element={<AuthRoute>
                    <Chatting />
                </AuthRoute>} />


                {/* Project section nae routes    */}
                <Route path="/createProject" element={<AuthRoute>
                    <CreateProject />
                </AuthRoute>} />
                <Route path="/manageProject" element={<AuthRoute>
                    <ManageProject />
                </AuthRoute>} />
                <Route path="/manageProject/:id" element={<AuthRoute>
                    <ProjectView />
                </AuthRoute>} />


                {/* Task section nae routes */}
                <Route path="/task" element={<AuthRoute>
                    <TaskPage />
                </AuthRoute>} />
                <Route path="/createTask" element={<AuthRoute>
                    <CreateTask />
                </AuthRoute>} />
                <Route path="/manageTask" element={<AuthRoute>
                    <ManageTask />
                </AuthRoute>} />
                <Route path="/manageTask/:id" element={<AuthRoute>
                    <TaskView />
                </AuthRoute>} />
                <Route path="/manageTask/calendar" element={<AuthRoute>
                    <Calendar />
                </AuthRoute>} />


                {/* File section nae routes    */}
                <Route path="/file" element={<AuthRoute>
                    <FilePage />
                </AuthRoute>} />
                <Route path="/uploadFile" element={<AuthRoute>
                    <UploadFile />
                </AuthRoute>} />
                <Route path="/manageFile" element={<AuthRoute>
                    <ManageFile />
                </AuthRoute>} />


            </Routes>
        </>
    )
}
