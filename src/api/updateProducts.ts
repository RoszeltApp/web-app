import { useFetching } from "../hooks/useFetching";
import api from "./api";

export function useUpdateProducts() {
    const fetch = async (id: number, fileld: string, value: string | number) => {
        let params: any = {
            id,
        }
        switch (fileld) {
            case 'name':
                params = { ...params, name: value }
                break;
            case 'price':
                params = { ...params, price: value }
                break;
            case 'quantity':
                params = { ...params, quantity: value }
                break;

        }

        const response = await api.post('/api/product/update_products', {}, {
            params
        })

        console.log(response);

        return response;
    }

    const { fetching, isLoading, error } = useFetching(fetch);

    return {
        fetching,
        isLoading,
        error,
    }
}