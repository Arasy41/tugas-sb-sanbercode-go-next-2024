import axios from "axios";

const Api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json"
    },
});

Api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("token");

    try {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch (error) {
        console.log(error);
    }
    return config;
});

export default Api;