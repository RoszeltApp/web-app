import { WrapperProps } from "./Props"

export type AppRoute = {
    name: string,
    path: string,
    exact: boolean,
    layout: (props: WrapperProps) => JSX.Element,
    component: () => JSX.Element,
    menu: boolean,
}