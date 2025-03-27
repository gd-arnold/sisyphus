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

const handleResponse = async (response) => {
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');

    const data = isJson ? await response.json() : await response.text();

    if (response.ok) {
        return data;
    }

    const error = {
        status: response.status,
        statusText: response.statusText,
        data
    };

    return Promise.reject(error);
};

const api = {
    get: async (url) => {
        try {
            const response = await fetch(API_URL + url, {
                headers: setHeaders()
            });

            return await handleResponse(response);
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    post: async (url, body) => {
        try {
            const response = await fetch(API_URL + url, {
                method: "POST",
                headers: setHeaders(),
                body: JSON.stringify(body)
            });

            return await handleResponse(response);
        } catch(e) {
            console.error(e);
            throw e;
        }
    }
};

export default api;
