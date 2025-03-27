import { useEffect, useState } from "react";
import Page from "../components/Page";
import useAuth from "../state/auth";
import { useNavigate } from "react-router-dom";
import useUser from "../state/user";

function Login() {
    const { login, error, isAuthenticated } = useAuth();
    const { fetchUser } = useUser();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated)
            navigate("/");
    }, [isAuthenticated, navigate])

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
        <div>
          <div>
            <h1>Login</h1>
            <p>Sign in to track your habits</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
               
                required
              />
            </div>

            <div>
              <label htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div>
                {error}
              </div>
            )}

            <button onClick={handleSubmit}>
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div>
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
             
            >
              Sign up
            </button>
          </div>
        </div>
      </Page>
    );
}

export default Login;
