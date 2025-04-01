export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        return "Email is required";
    } else if (!emailRegex.test(email)) {
        return "Please enter a valid email address";
    }

    return "";
};

export const validatePassword = (password) => {
    if (!password) {
        return "Password is required";
    } else if (password.length < 8) {
        return "Password must be at least 8 characters long";
    }

    return "";
};

export const validateUsername = (username) => {
    if (!username) {
        return "Username is required";
    } else if (username.length < 3) {
        return "Username must be at least 3 characters long";
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return "Username can only contain letters, numbers, and underscores";
    }

    return "";
};

export const validatePasswordMatch = (password, confirmPassword) => {
    if (!confirmPassword) {
        return "Please confirm your password";
    } else if (password !== confirmPassword) {
        return "Passwords don't match";
    }

    return "";
};
