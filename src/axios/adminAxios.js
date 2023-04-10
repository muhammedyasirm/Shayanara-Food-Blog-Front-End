import axios from "axios";
import { URL } from '../constance/constance';

const instance = axios.create({
    baseURL: URL
})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("adminToken");
    if(token) {
        config.headers.Authorization = token;
    }
    return config;
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        localStorage.removeItem("adminToken");
    }
)

export default instance;