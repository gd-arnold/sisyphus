const API_URL = process.env.REACT_APP_API_URL;

const setHeaders = () => {
    const headers = {
        "Content-type": "application/json"
    };

    const token = localStorage.getItem("token");
    if (token)
        headers["Authorization"] = `Bearer ${token}`;

    return headers;
}

const api = {
    get: async (url) => {
        try {
            const response = await fetch(API_URL + url, {
                headers: setHeaders()
            });
            const data = await response.json();

            return data;
        } catch (e) {
            console.error(e);
        }
    },
    post: async (url, body) => {
        try {
            const response = await fetch(API_URL + url, {
                method: "POST",
                headers: setHeaders(),
                body: JSON.stringify(body)
            });
            const data = await response.json();

            return data;
        } catch(e) {
            console.error(e);
        }
    }
};

export default api;
