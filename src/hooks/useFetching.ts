import { useState } from "react";


export function useFetching<T>(callback: () => Promise<T>) {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async () => {
        try {
            setLoading(true);
            await callback()
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    return { fetching, isLoading, error }
}