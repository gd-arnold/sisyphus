import { useNavigate } from "react-router-dom";
import useAuth from "../state/auth";

function Header() {
    const { logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate("/")}>Home</button>
            {isAuthenticated ? (
                <button onClick={() => logout()}>Logout</button>
            ) : (
                <>
                <button onClick={() => navigate("/login")}>Login</button>
                <button onClick={() => navigate("/register")}>Register</button>
                </>
            )}
        </div>
    );
}

export default Header;
