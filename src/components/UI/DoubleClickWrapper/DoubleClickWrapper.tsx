import { useRef } from 'react'
import styles from './DoubleClickWrapper.module.css';


export default function DoubleClickWrapper({ onClick = () => { }, onDoubleClick = () => { }, children }: any) {

    const timer: any = useRef()

    const onClickHandler = (event: any) => {
        clearTimeout(timer.current);

        if (event.detail === 1) {
            timer.current = setTimeout(onClick, 200)
        } else if (event.detail === 2) {
            onDoubleClick()
        }
    }
    return (
        <div onClick={onClickHandler} className={styles.noselect}>{children}</div>
    )
}
