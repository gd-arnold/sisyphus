import { useEffect, useState } from "react";
import Page from "../components/Page";
import useAuth from "../state/auth";
import { useNavigate } from "react-router-dom";
import useUser from "../state/user";
import Button from "../components/Button";
import { 
  validateEmail, 
  validatePassword, 
  validateUsername, 
  validatePasswordMatch 
} from "../utils/validation";

function Register() {
    const { isAuthenticated, register, error, clearError } = useAuth();
    const { fetchUser } = useUser();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const [emailError, setEmailError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [touchedFields, setTouchedFields] = useState({
        email: false,
        username: false,
        password: false,
        confirmPassword: false
    });

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
    
    const handleUsernameChange = (e) => {
        const newUsername = e.target.value;
        setUsername(newUsername);
        
        if (touchedFields.username) {
            setUsernameError(validateUsername(newUsername));
        }
    };
    
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        
        if (touchedFields.password) {
            setPasswordError(validatePassword(newPassword));
        }
        
        if (touchedFields.confirmPassword) {
            setConfirmPasswordError(validatePasswordMatch(newPassword, confirmPassword));
        }
    };
    
    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        
        if (touchedFields.confirmPassword) {
            setConfirmPasswordError(validatePasswordMatch(password, newConfirmPassword));
        }
    };
    
    const handleBlur = (field) => {
        setTouchedFields({
            ...touchedFields,
            [field]: true
        });
        
        switch (field) {
            case "email":
                setEmailError(validateEmail(email));
                break;
            case "username":
                setUsernameError(validateUsername(username));
                break;
            case "password":
                setPasswordError(validatePassword(password));
                break;
            case "confirmPassword":
                setConfirmPasswordError(validatePasswordMatch(password, confirmPassword));
                break;
            default:
                break;
        }
    };

    const validateForm = () => {
        const emailValidationResult = validateEmail(email);
        const usernameValidationResult = validateUsername(username);
        const passwordValidationResult = validatePassword(password);
        const confirmPasswordValidationResult = validatePasswordMatch(password, confirmPassword);
        
        setEmailError(emailValidationResult);
        setUsernameError(usernameValidationResult);
        setPasswordError(passwordValidationResult);
        setConfirmPasswordError(confirmPasswordValidationResult);
        
        setTouchedFields({
            email: true,
            username: true,
            password: true,
            confirmPassword: true
        });
        
        return !emailValidationResult && 
               !usernameValidationResult && 
               !passwordValidationResult && 
               !confirmPasswordValidationResult;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        const success = await register(email, username, password);
        setIsLoading(false);

        if (success) {
            await fetchUser();
            navigate("/");
        }
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
                onChange={handleEmailChange}
                onBlur={() => handleBlur("email")}
                placeholder="you@example.com"
                className={`rounded-md border-none bg-black px-4 py-2 outline-none ${
                  emailError ? "ring-1 ring-red-500" : ""
                }`}
              />
              {emailError && (
                <p className="text-red-400 text-sm mt-1">{emailError}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="text-sm text-light-gray">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                onBlur={() => handleBlur("username")}
                placeholder="username"
                className={`rounded-md border-none bg-black px-4 py-2 outline-none ${
                  usernameError ? "ring-1 ring-red-500" : ""
                }`}
              />
              {usernameError && (
                <p className="text-red-400 text-sm mt-1">{usernameError}</p>
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
                className={`rounded-md border-none bg-black px-4 py-2 outline-none ${
                  passwordError ? "ring-1 ring-red-500" : ""
                }`}
              />
              {passwordError && (
                <p className="text-red-400 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="confirmPassword" className="text-sm text-light-gray">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                onBlur={() => handleBlur("confirmPassword")}
                placeholder="••••••••"
                className={`rounded-md border-none bg-black px-4 py-2 outline-none ${
                  confirmPasswordError ? "ring-1 ring-red-500" : ""
                }`}
              />
              {confirmPasswordError && (
                <p className="text-red-400 text-sm mt-1">{confirmPasswordError}</p>
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
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="text-center text-light-gray">
            Already have an account?{" "}
            <button
              type="button"
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
