import LoginForm from "../components/Forms/LoginForm";
import RegisterForm from "../components/Forms/RegisterForm";
import AuthLayout from "../layouts/AuthLayout";
import { AppRoute } from "../types/Route";

const unAuthRoutes: AppRoute[] = [
    {
        name: 'Логин',
        exact: true,
        path: '/login',
        component: LoginForm,
        layout: AuthLayout,
        menu: false,

    },
    {
        name: 'Регистрация',
        exact: true,
        path: '/register',
        component: RegisterForm,
        layout: AuthLayout,
        menu: false,
    }
]

export default unAuthRoutes;