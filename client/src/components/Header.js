import { Link, useNavigate } from "react-router-dom";
import logo from "../logo.svg"
import useAuth from "../state/auth";
import Button from "./Button";
import { LogOut } from "lucide-react";

function Header() {
    const { logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    return (
      <nav className="sticky m-auto flex h-20 w-full items-center justify-between rounded-2xl bg-gray bg-opacity-50 px-8 py-2 backdrop-blur-xl sm:w-[600px]">
        <Link to="/" className="flex items-center gap-2">
            <img src={logo} className="size-10" alt="logo" />
            sisyphus
        </Link>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Button
                className="cursor-pointer duration-100 hover:opacity-75 flex items-center gap-1"
                onClick={() => {
                  logout();
                }}
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Button
                color="black"
                className="cursor-pointer text-white duration-100 hover:opacity-75"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>

              <Button
                className="cursor-pointer duration-100 hover:opacity-90"
                onClick={() => navigate("/register")}
              >
                Sign up
              </Button>
            </>
          )}
        </div>
      </nav>
    );
}

export default Header;
