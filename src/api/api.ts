import axios, { AxiosRequestConfig } from "axios";
import { Tokens } from "../types/TokenType";
import { login } from "../stores/reducers/AuthReducer";
import { logout } from "../stores/reducers/AuthReducer";
import store from "../stores/store";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_ROOT,
    withCredentials: true,

})

api.interceptors.request.use(
    (config: AxiosRequestConfig): any => {
        if (!config) {
            config = {};
        }
        if (!config.headers) {
            config.headers = {};
        }
        config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
        return config;
    },
    (error) => {
        return Promise.resolve(error)
    }
)

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const original_request = error.config;


        if (error.response.status === 403 && !error.config._isRetry) {
            original_request._isRetry = true;

            try {
                const response = await axios.post<Tokens>(import.meta.env.VITE_API_ROOT + '/api/user/refresh', {}, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('refresh_token'),
                    }
                })
                store.dispatch(login(response.data));
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('refresh_token', response.data.refresh_token);
                return api.request(original_request);
            } catch (error) {
                store.dispatch(logout());
            }

        }
        return Promise.reject(error);
    }
)

export default api;