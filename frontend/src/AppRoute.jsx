import { Routes, Route } from "react-router-dom";
import DefaultPage from "./Pages/DefaultPage/DefaultPage";
import HomePage from "./Pages/HomePage/HomePage";

export default function AppRoute() {
    return (
        <>
            <Routes>
                <Route path="/" element={<DefaultPage />} />
                <Route path="/home" element={<HomePage />} />
            </Routes>
        </>
    )
}
