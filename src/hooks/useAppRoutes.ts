import { useEffect, useState } from "react"
import routes from "../router/routers"
import unAuthRoutes from "../router/unAuthRoutes"
import userRoutes from "../router/userRoutes"
import { AppRoute } from "../types/Route"
import { useAppSelector } from "./redux"

export function useAppRoutes() {
    const { isAuth } = useAppSelector(state => state.auth);
    const { user } = useAppSelector(state => state)

    const [mainRoutes, setRoutes] = useState<AppRoute[]>([...routes, ...unAuthRoutes])
    useEffect(() => {
        if (isAuth) {
            if (user.role.id === 2) {
                setRoutes([...routes])
            }
            else {
                setRoutes([...routes, ...userRoutes])
            }
        }
        else {
            setRoutes([...routes, ...unAuthRoutes])
        }
    }, [isAuth, user.role]);

    return mainRoutes;
}