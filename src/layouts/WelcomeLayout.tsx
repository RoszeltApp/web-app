import { WrapperProps } from "../types/Props";

export default function WelcomeLayout(props: WrapperProps) {
    return (
        <div style={{ width: '100%' }}>
            {props.children}
        </div>
    )
}
