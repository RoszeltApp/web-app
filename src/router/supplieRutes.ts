import MainLayout from "../layouts/MainLayout";
import MainPage from "../pages/MainPage";
import ProductCardPage from "../pages/ProductCardPage";
import SupplierCatalog from "../pages/SupplierCatalog";
import { AppRoute } from "../types/Route";


const supplierRoutes: AppRoute[] = [
    {
        name: 'Главная',
        exact: true,
        path: '/main',
        component: MainPage,
        layout: MainLayout,
        menu: true,
    },
    {
        name: 'Мой каталог',
        exact: true,
        path: '/supplier-catalog',
        component: SupplierCatalog,
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
    }
]

export default supplierRoutes;