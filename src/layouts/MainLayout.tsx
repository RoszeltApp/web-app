import { ScrollArea } from '@mantine/core'
import MyHeader from '../components/UI/Header/MyHeader'
import { WrapperProps } from '../types/Props'



export default function MainLayout(props: WrapperProps) {
    return (

        <ScrollArea h='100vh'>
            <div><MyHeader></MyHeader></div>

            <main>
                {props.children}
            </main>

            <footer>

            </footer>
        </ScrollArea>
    )
}
