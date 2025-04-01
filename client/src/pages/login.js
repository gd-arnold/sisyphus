import { useEffect, useState } from "react";
import Page from "../components/Page";
import useAuth from "../state/auth";
import { useNavigate } from "react-router-dom";
import useUser from "../state/user";
import Button from "../components/Button";

function Login() {
    const { login, error, clearError, isAuthenticated } = useAuth();
    const { fetchUser } = useUser();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated)
            navigate("/");

        clearError();
    }, [isAuthenticated, navigate, clearError])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        const success = await login(email, password);
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
            <h1 className="text-4xl font-bold">Login</h1>
            <p className="text-light-gray">Sign in to track your habits</p>
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

            {error && (
              <div className="bg-red-500 bg-opacity-20 text-red-300 p-2 rounded text-sm">
                {error}
              </div>
            )}

            <Button
              className="w-full py-2 mt-2"
              onClick={handleSubmit}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="text-center text-light-gray">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue hover:underline"
            >
              Sign up
            </button>
          </div>
        </div>
      </Page>
    );
}

export default Login;
