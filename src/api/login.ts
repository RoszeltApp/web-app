import { UserLogin } from "../types/UserType";
import { Tokens } from "../types/TokenType";
import api from "./api";


export const fetchLogin = async (loginForm: UserLogin): Promise<Tokens> => {
    const response = await api.postForm<Tokens>(import.meta.env.VITE_API_ROOT + '/api/user/login', loginForm);

    return response.data;
}