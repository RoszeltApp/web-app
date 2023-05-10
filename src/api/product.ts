import { useState } from "react";
import { ProductResponse } from "../types/ProductTypes";
import { useFetching } from "../hooks/useFetching";
import api from "./api";


export function useProduct(pageCount: number) {
    const initialState: ProductResponse = {
        total_count: 0,
        data: []
    }
    const [data, setData] = useState(initialState);
    const [totalPages, setTotalPages] = useState(0);
    const [query_string, setQuery] = useState('');
    const [price_max, setPriceMax] = useState<number | "">(10000)
    const [price_min, setPriceMin] = useState<number | "">(0);
    const [activePage, setActivePage] = useState(1);

    const fetchCatalog = async () => {
        let params: any = {
            limit: pageCount,
            offset: pageCount * (activePage - 1),
            query_string,
        }
        if (price_max !== "") params = { ...params, price_max }
        if (price_min !== "") params = { ...params, price_min }


        console.log(price_min, price_max, params)

        const response = await api.get<ProductResponse>('/api/product/catalog', {
            params
        });

        console.log(response)
        setData(response.data);
        setTotalPages(Math.ceil(response.data.total_count / pageCount))
    }

    const { fetching, isLoading, error } = useFetching(fetchCatalog)

    return {
        fetching,
        isLoading,
        error,
        data,
        totalPages,
        activePage,
        setActivePage,
        query_string,
        setQuery,
        price_max,
        setPriceMax,
        price_min,
        setPriceMin,
    };
}