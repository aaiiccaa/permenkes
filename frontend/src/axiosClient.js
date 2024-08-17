import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;
        if (response) {
            if (response.status === 404) {
                console.error('Resource not found.');
            } else {
                console.error('An error occurred:', response.data);
            }
        } else {
            console.error('Network error or no response from server:', error);
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
