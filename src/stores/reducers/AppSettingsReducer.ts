import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store";
import { ColorScheme } from "@mantine/core";

export interface AppState {
    theme: ColorScheme
}

const initialState: AppState = {
    theme: 'dark'
}


export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        changeTheme(state, action: PayloadAction<ColorScheme>) {
            state.theme = action.payload;
        }
    }
})

export const { changeTheme } = appSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAppTheme = (state: RootState) => state.app.theme

export default appSlice.reducer