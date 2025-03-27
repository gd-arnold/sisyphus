import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import useAuth from "./state/auth";
import Welcome from "./pages/welcome";
import { useEffect } from "react";
import useUser from "./state/user";

function App() {
    const { logout, isAuthenticated } = useAuth();
    const { user, fetchUser } = useUser();

    useEffect(() => {
        if (isAuthenticated) {
            fetchUser().catch(logout);
        }

    }, [isAuthenticated, fetchUser, logout]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={isAuthenticated ? (user ? <Home /> : undefined) : (<Welcome />)} />
                <Route path="/login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
