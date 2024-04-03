import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthRoute from "../AuthRoute/AuthRoute";
import FallBack from "../../FallBackUI/FallBack";

// Lazy loaded components
const DefaultPage = lazy(() =>import("../../../Pages/DefaultPage/DefaultPage"));
const HomePage = lazy(() => import("../../../Pages/HomePage/HomePage"));
const Login = lazy(() => import("../../../Pages/Login/Login"));
const SignUp = lazy(() => import("../../../Pages/Signup/SignUp"));
const ProjectPage = lazy(() =>import("../../../Pages/ProjectPage/ProjectPage"));
const CreateProject = lazy(() =>import("../../CreateProject/CreateProject"));
const ManageProject = lazy(() =>import("../../ManageProject/ManageProject"));
const ProjectView = lazy(() =>import("../../../Pages/ProjectView/ProjectView"));
const ChatPage = lazy(() => import("../../../Pages/ChatPage/ChatPage"));
const SearchMember = lazy(() => import("../../SearchMember/SearchMember"));
const TaskPage = lazy(() => import("../../../Pages/TaskPage/TaskPage"));
const CreateTask = lazy(() => import("../../CreateTask/CreateTask"));
const ManageTask = lazy(() => import("../../ManageTask/ManageTask"));
const TaskView = lazy(() => import("../../../Pages/TaskView/TaskView"));
const Calendar = lazy(() => import("../../Calendar/Calendar"));
const FilePage = lazy(() => import("../../../Pages/FilePage/FilePage"));
const UploadFile = lazy(() => import("../../UploadFile/UploadFile"));
const ManageFile = lazy(() => import("../../ManageFile/ManageFile"));
const Chatting = lazy(() => import("../../Chatting/Chatting"));
const ProfilePage = lazy(() =>import("../../../Pages/ProfilePage/ProfilePage"));
const ForgotPassword = lazy(() =>import("../../../Pages/ForgotPassword/ForgotPassword"));
const ResetPassword = lazy(() =>import("../../../Pages/ResetPassword/ResetPassword"));

export default function AppRoute() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{ duration: 2000 }}
      />
      <Suspense fallback={<FallBack/>}>
        <Routes>
          <Route path="/login"element={<Login />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/" element={<DefaultPage />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/api/student/newPassword/:id/:token" element={<ResetPassword />}/>

          {/* main pages */}
          <Route path="/home" element={<AuthRoute> <HomePage /> </AuthRoute>}/>
          <Route path="/project" element={<AuthRoute> <ProjectPage /> </AuthRoute>}/>
          <Route path="/chat" element={<AuthRoute> <ChatPage /> </AuthRoute>}/>
          <Route path="/profile" element={<AuthRoute> <ProfilePage /> </AuthRoute>}/>

          {/* Chat section nae routes */}
          <Route path="/chat/find" element={<AuthRoute> <SearchMember /> </AuthRoute>}/>
          <Route path="/chat/chatting" element={<AuthRoute> <Chatting /> </AuthRoute>}/>

          {/* Project section nae routes    */}
          <Route path="/createProject" element={<AuthRoute> <CreateProject /></AuthRoute>}/>
          <Route path="/manageProject" element={<AuthRoute> <ManageProject /> </AuthRoute>}/>
          <Route path="/manageProject/:id" element={<AuthRoute> <ProjectView /> </AuthRoute>}/>

          {/* Task section nae routes */}
          <Route path="/task" element={<AuthRoute> <TaskPage /> </AuthRoute>}/>
          <Route path="/createTask" element={<AuthRoute> <CreateTask /> </AuthRoute>}/>
          <Route path="/manageTask" element={<AuthRoute> <ManageTask /> </AuthRoute>}/>
          <Route path="/manageTask/:id" element={<AuthRoute> <TaskView /> </AuthRoute>}/>
          <Route path="/manageTask/calendar" element={<AuthRoute> <Calendar /> </AuthRoute>}/>

          {/* File section nae routes    */}
          <Route path="/file" element={<AuthRoute> <FilePage /> </AuthRoute>}/>
          <Route path="/uploadFile" element={<AuthRoute> <UploadFile /> </AuthRoute>}/>
          <Route path="/manageFile" element={<AuthRoute> <ManageFile /> </AuthRoute>}/>
        </Routes>
      </Suspense>
    </>
  );
}
