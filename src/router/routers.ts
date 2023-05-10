import WelcomeLayout from "../layouts/WelcomeLayout";
import WelcomePage from "../pages/WelcomePage";
import { AppRoute } from "../types/Route";


const routes: AppRoute[] = [
    {
        name: 'Главная',
        exact: true,
        path: '/',
        component: WelcomePage,
        layout: WelcomeLayout,
        menu: false,
    }
]

export default routes;
