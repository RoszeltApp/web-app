import { ProductProps } from '../types/ProductTypes'
import api from './api'
import { useFetching } from '../hooks/useFetching'


type UploadProductType = {
    name: string,
    article: string,
    price: number,
    quantity: number,
    props: ProductProps[]
}


export function useUploadProduct() {

    const fetch = async (data: UploadProductType) => {
        const response = await api.post('/api/product/upload_products', [data]);
        console.log(response);
    }

    const { fetching, isLoading, error } = useFetching(fetch);

    return {
        fetching,
        isLoading,
        error,
    }
}