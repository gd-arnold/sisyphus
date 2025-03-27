import { useEffect, useState } from "react";
import Page from "../components/Page";
import useAuth from "../state/auth";
import { useNavigate } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const {isAuthenticated, register, error } = useAuth();

    useEffect(() => {
        if (isAuthenticated)
            navigate("/");
    }, [isAuthenticated, navigate]);

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
        setIsLoading(false);

        if (success)
            navigate("/");
    };

    return (
      <Page>
        <div>
          <div>
            <h1>Create account</h1>
            <p>Sign up to start tracking your habits</p>
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
              <label htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"

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

            <div>
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"

                required
              />
            </div>

            {passwordError && (
              <div>
                {passwordError}
              </div>
            )}

            {error && (
              <div>
                {error}
              </div>
            )}

            <button

              onClick={handleSubmit}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div>
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}

            >
              Sign in
            </button>
          </div>
        </div>
      </Page>
    );
}

export default Register;
