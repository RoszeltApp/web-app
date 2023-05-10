import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { User } from "../../types/UserType";



const initialState: User = {
    id: -1,
    name: '',
    company_name: '',
    mail: '',
    phone: '',
    role: {
        id: -1,
        role_name: ''
    },
    type: '',
    exp: ''
};

function parseToken(token: string | null): User | undefined {
    if (token)
        return JSON.parse(atob(token.split('.')[1]))
    return undefined;
}


export const userSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        createUser(state, action: PayloadAction<string>) {
            const usr = parseToken(action.payload);
            console.log(usr)
            if (usr !== undefined) {
                state.id = usr.id;
                state.name = usr.name;
                state.phone = usr.phone;
                state.mail = usr.mail;
                state.company_name = usr.company_name;
                state.role = usr.role;
                console.log({ state })
            }
        }
    },
})

export const { createUser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectAppTheme = (state: RootState) => state.app.theme

export default userSlice.reducer