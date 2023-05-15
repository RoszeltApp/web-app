import { ProductProps, UploadProductResponse } from '../types/ProductTypes'
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
        const response = await api.post<UploadProductResponse>('/api/product/upload_products', [data]);
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