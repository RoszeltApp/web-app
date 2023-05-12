import './styles/App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { changeTheme } from './stores/reducers/AppSettingsReducer'
import { useEffect } from 'react'
import { refresh } from './api/refresh'
import { createUser } from './stores/reducers/userReducer'

import { Error404 } from './pages/Error404'
import { setRefreshToken } from './stores/reducers/AuthReducer'

import { Tokens } from './types/TokenType'
import { useAppRoutes } from './hooks/useAppRoutes';
import { Notifications } from '@mantine/notifications';


function App() {

    const colorScheme = useAppSelector(state => state.app.theme)
    const dispatch = useAppDispatch()

    const toggleColorScheme = (value?: ColorScheme) => {
        console.log(value)
        if (colorScheme === 'dark') {
            dispatch(changeTheme('light'))
            localStorage.setItem('theme', 'light')
        }
        else {
            dispatch(changeTheme('dark'))
            localStorage.setItem('theme', 'dark')
        }
    };

    const { isLoading } = useAppSelector(state => state.auth);


    useEffect(() => {
        const theme = localStorage.getItem('theme') as ColorScheme
        if (theme) {
            dispatch(changeTheme(theme))
        }
        dispatch(setRefreshToken());
        dispatch(refresh()).then((p) => {
            const payload = p.payload as Tokens

            localStorage.setItem('access_token', payload.access_token);
            localStorage.setItem('refresh_token', payload.refresh_token);
            dispatch(createUser(payload.access_token));
        });

    }, [])

    const mainRoutes = useAppRoutes();


    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                <Notifications />
                <BrowserRouter>
                    {
                        isLoading ? <div>Загрузка</div> :
                            <Routes>
                                {
                                    mainRoutes.map(route =>
                                        <Route
                                            key={route.path}
                                            path={route.path}
                                            element={
                                                <route.layout>
                                                    <route.component></route.component>
                                                </route.layout>}
                                        />
                                    )
                                }
                                <Route path="*" element={<Error404 />} />
                            </Routes>
                    }

                </BrowserRouter>

            </MantineProvider>
        </ColorSchemeProvider>
    )
}

export default App
