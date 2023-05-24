import MainLayout from "../layouts/MainLayout";
import CatalogPage from "../pages/CatalogPage";
import MainPage from "../pages/MainPage";
import PlacementPage from "../pages/PlacementPage";
import ProductCardPage from "../pages/ProductCardPage";
import ProductBasketPage from "../pages/ProductsBacketPage";
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
    },
    {
        name: 'Размещение компонентов',
        exact: true,
        path: '/place',
        component: PlacementPage,
        layout: MainLayout,
        menu: true,
    },
    {
        name: 'product',
        exact: true,
        path: '/product/:id',
        component: ProductCardPage,
        layout: MainLayout,
        menu: false
    },
    {
        name: 'Корзина',
        exact: true,
        path: '/basket',
        component: ProductBasketPage,
        layout: MainLayout,
        menu: false,
    }
]

export default userRoutes;