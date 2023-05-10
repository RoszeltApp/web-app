import MainLayout from "../layouts/MainLayout";
import CatalogPage from "../pages/CatalogPage";
import MainPage from "../pages/MainPage";
import { AppRoute } from "../types/Route";

const userRoutes: AppRoute[] = [
    {
        name: 'Главная',
        exact: true,
        path: '/main',
        component: MainPage,
        layout: MainLayout,
        menu: true,
    },
    {
        name: 'Каталог',
        exact: true,
        path: '/catalog',
        component: CatalogPage,
        layout: MainLayout,
        menu: true,
    }
]

export default userRoutes;