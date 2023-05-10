import axios from "axios";
import { UserRegister } from "../types/UserType";


export const register = async (retisterForm: UserRegister) => {
    console.log(retisterForm)
    const response = await axios.postForm(import.meta.env.VITE_API_ROOT + '/api/user/register', retisterForm);

    return response.data;
}