import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Tokens } from "../types/TokenType";




export const refresh = createAsyncThunk('refresh',
    async (_, thunlAPI) => {

        try {
            const state = thunlAPI.getState() as any;

            console.log(state)
            const response = await axios.post<Tokens>(import.meta.env.VITE_API_ROOT + '/api/user/refresh', {}, {
                headers: {
                    'Authorization': 'Bearer ' + state.auth.refresh_token,
                    'Access-Control-Allow-Origin': import.meta.env.VITE_API_ROOT,
                    "Access-Control-Allow-Credentials": 'true',
                    'Accept': 'application/json'
                }
            })
            return response.data;
        }
        catch (error) {
            console.log(error)
            return thunlAPI.rejectWithValue("Ошибка")
        }

    }
)