import axios from "axios";
import { UserLogin } from "../types/UserType";
import { Tokens } from "../types/TokenType";


export const fetchLogin = async (loginForm: UserLogin): Promise<Tokens> => {
    const response = await axios.postForm<Tokens>(import.meta.env.VITE_API_ROOT + '/api/user/login', loginForm);

    return response.data;
}