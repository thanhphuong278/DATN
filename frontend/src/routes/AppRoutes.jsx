import { Routes, Route } from 'react-router-dom'
import SignUp from '../pages/Auth/SignUp/SignUp.jsx'
import Login from '../pages/Auth/Login/Login.jsx'
import Home from '../pages/Home/Home.jsx'
export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
        </Routes>
    )
}
