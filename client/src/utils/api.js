const API_URL = process.env.REACT_APP_API_URL;

const api = {
    get: async (url) => {
        const headers = {
            "Content-type": "application/json"
        };

        try {
            console.log(API_URL);
            const response = await fetch(API_URL + url, {
                headers
            });
            const data = await response.json();
            console.log(data);

            return data;
        } catch (e) {
            console.error(e);
        }
    },
    post: async (url, body) => {
        const headers = {
            "Content-type": "application/json"
        };

        try {
            const response = await fetch(API_URL + url, {
                method: "POST",
                headers,
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
