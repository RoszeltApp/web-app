import { TextInput } from '@mantine/core';
import { KeyboardEvent, useRef, useState } from 'react';
import styles from './TableInput.module.css';
import DoubleClickWrapper from '../DoubleClickWrapper/DoubleClickWrapper';
import { useClickOutside, useFocusTrap, useMergedRef } from '@mantine/hooks';


export default function TableInput({ text, onChange }: { text: string, onChange: (value: string) => void }) {
    const [showText, setShowText] = useState(true);

    const myRef = useRef() as any;
    const useClickOutsideRef = useClickOutside(() => { setShowText(true); onChange(myRef.current.value) });
    const focusTrapRef = useFocusTrap();
    const mergedRef = useMergedRef(myRef, useClickOutsideRef, focusTrapRef) as any;


    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key == 'Enter') {
            setShowText(true);
            onChange(myRef.current.value)
        }
    }

    if (showText) {
        return (
            <DoubleClickWrapper className={styles.noselect} onDoubleClick={() => setShowText(false)}>{text}</DoubleClickWrapper>
        )
    }
    else {
        return (<TextInput
            onKeyPress={handleKeyPress}
            ref={mergedRef}
            defaultValue={text}
            radius="xs"
            withAsterisk
        />)
    }

}
