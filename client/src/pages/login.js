import { useEffect, useState } from "react";
import Page from "../components/Page";
import useAuth from "../state/auth";
import { useNavigate } from "react-router-dom";
import useUser from "../state/user";
import Button from "../components/Button";
import { validateEmail, validatePassword } from "../utils/validation";

function Login() {
    const { login, error, clearError, isAuthenticated } = useAuth();
    const { fetchUser } = useUser();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [touchedFields, setTouchedFields] = useState({
        email: false,
        password: false
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated)
            navigate("/");
        clearError();
    }, [isAuthenticated, navigate, clearError]);

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        if (touchedFields.email) {
            setEmailError(validateEmail(newEmail));
        }
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        if (touchedFields.password) {
            setPasswordError(validatePassword(newPassword));
        }
    };

    const handleBlur = (field) => {
        setTouchedFields({
            ...touchedFields,
            [field]: true
        });

        if (field === "email") {
            setEmailError(validateEmail(email));
        } else if (field === "password") {
            setPasswordError(validatePassword(password));
        }
    };

    // Validate all form fields
    const validateForm = () => {
        const emailValidationResult = validateEmail(email);
        const passwordValidationResult = validatePassword(password);

        setEmailError(emailValidationResult);
        setPasswordError(passwordValidationResult);

        setTouchedFields({
            email: true,
            password: true
        });

        return !emailValidationResult && !passwordValidationResult;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields before submission
        if (!validateForm()) {
            return;
        }

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
                            onChange={handleEmailChange}
                            onBlur={() => handleBlur("email")}
                            placeholder="you@example.com"
                            className={`rounded-md border-none bg-black px-4 py-2 outline-none ${emailError ? "ring-1 ring-red-500" : ""
                                }`}
                        />
                        {emailError && (
                            <p className="text-red-400 text-sm mt-1">{emailError}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="text-sm text-light-gray">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            onBlur={() => handleBlur("password")}
                            placeholder="••••••••"
                            className={`rounded-md border-none bg-black px-4 py-2 outline-none ${passwordError ? "ring-1 ring-red-500" : ""
                                }`}
                        />
                        {passwordError && (
                            <p className="text-red-400 text-sm mt-1">{passwordError}</p>
                        )}
                    </div>
                    {error && (
                        <div className="bg-red-500 bg-opacity-20 text-red-300 p-2 rounded text-sm">
                            {error}
                        </div>
                    )}
                    <Button
                        type="submit"
                        className="w-full py-2 mt-2"
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing in..." : "Sign in"}
                    </Button>
                </form>
                <div className="text-center text-light-gray">
                    Don't have an account?{" "}
                    <button
                        type="button"
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
