import { useEffect, useState } from "react";
import Page from "../components/Page";
import useAuth from "../state/auth";
import { useNavigate } from "react-router-dom";
import useUser from "../state/user";
import Button from "../components/Button";

function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const { isAuthenticated, register, error, clearError } = useAuth();
    const { fetchUser } = useUser();

    useEffect(() => {
        if (isAuthenticated)
            navigate("/");

        clearError();
    }, [isAuthenticated, navigate, clearError]);

    const validateForm = () => {
        if (password !== confirmPassword) {
            setPasswordError("Passwords don't match");
            return false;
        }

        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters");
            return false;
        }

        setPasswordError("");
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm())
            return;

        setIsLoading(true);
        const success = await register(email, username, password);
        if (success) {
            await fetchUser();
            navigate("/");
        }
        setIsLoading(false);
    };

    return (
      <Page>
        <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-4xl font-bold">Create account</h1>
            <p className="text-light-gray">Sign up to start tracking your habits</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm text-light-gray">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="rounded-md border-none bg-black px-4 py-2 outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="text-sm text-light-gray">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                className="rounded-md border-none bg-black px-4 py-2 outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm text-light-gray">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="rounded-md border-none bg-black px-4 py-2 outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="confirmPassword" className="text-sm text-light-gray">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="rounded-md border-none bg-black px-4 py-2 outline-none"
                required
              />
            </div>

            {passwordError && (
              <div className="bg-red-500 bg-opacity-20 text-red-300 p-2 rounded text-sm">
                {passwordError}
              </div>
            )}

            {error && (
              <div className="bg-red-500 bg-opacity-20 text-red-300 p-2 rounded text-sm">
                {error}
              </div>
            )}

            <Button
              className="w-full py-2 mt-2"
              onClick={handleSubmit}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="text-center text-light-gray">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue hover:underline"
            >
              Sign in
            </button>
          </div>
        </div>
      </Page>
    );
}

export default Register;
