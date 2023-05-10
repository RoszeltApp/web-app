import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Tokens } from "../../types/TokenType";
import { refresh } from "../../api/refresh";



export interface AuthState extends Tokens {
    isAuth: boolean,
    error: string,
    isLoading: boolean,
}

const initialState: AuthState = {
    isAuth: false,
    access_token: '',
    refresh_token: '',
    error: '',
    isLoading: false,
}


export const authSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        logout(state) {
            state.isAuth = false;
            state.access_token = '';
            state.refresh_token = '';

            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        },
        login(state, action: PayloadAction<Tokens>) {
            state.isAuth = true;
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
        },
        setRefreshToken(state) {
            const token = localStorage.getItem('refresh_token')
            if (token !== null)
                state.refresh_token = token;
        }
    },
    extraReducers: {
        [refresh.fulfilled.type]: (state, action: PayloadAction<Tokens>) => {
            state.isAuth = true;
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
            state.isLoading = false;
        },
        [refresh.pending.type]: (state) => {
            state.isLoading = true;

        },
        [refresh.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isAuth = false;
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export const { login, logout, setRefreshToken } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectAppTheme = (state: RootState) => state.app.theme

export default authSlice.reducer