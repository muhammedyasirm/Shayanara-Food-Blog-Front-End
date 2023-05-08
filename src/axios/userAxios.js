import axios from "axios";
import { URL } from '../constance/constance';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const instance = axios.create({
    baseURL: URL
})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

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
        if(error.response.data.blocked) {
            const navigate = useNavigate();
            navigate("/");
            toast.success(
                'You have been blocked by Admin...',
                {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                }
            )
            localStorage.removeItem('token');
        } else {
            localStorage.removeItem('token');
        }
    }
);
export default instance;