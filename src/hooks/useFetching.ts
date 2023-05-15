import { useState } from "react";


export function useFetching<T>(callback: (...args: any[]) => Promise<T>) {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async (...args: any[]) => {
        try {
            setLoading(true);
            const response = await callback(...args)
            return response;

        } catch (e: any) {
            setError(e.message);
            console.log(e)
            throw new Error(e.message);

        } finally {
            setLoading(false);
        }
    }

    return { fetching, isLoading, error }
}