import { configureStore } from "@reduxjs/toolkit";
import AppSettingsReducer from "./reducers/AppSettingsReducer";
import AuthReducer from "./reducers/AuthReducer";
import userReducer from "./reducers/userReducer";


const store = configureStore({
    reducer: {
        app: AppSettingsReducer,
        auth: AuthReducer,
        user: userReducer,
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch