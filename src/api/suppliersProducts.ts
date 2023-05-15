import { useState } from "react";
import { SupplierProductResponse } from "../types/ProductTypes";
import { useFetching } from "../hooks/useFetching";
import api from "./api";

export function useSuppliersProducts(pageCount: number) {
    const initialState: SupplierProductResponse = {
        total_count: 0,
        data: []
    }

    const [data, setData] = useState(initialState);
    const [totalPages, setTotalPages] = useState(0);
    const [activePage, setActivePage] = useState(1);
    const [query_string, setQuery] = useState('')

    const { fetching: fetchSuppliersProducts, isLoading: suppliersProductsIsLoading, error } = useFetching(async () => {
        const response = await api.get<SupplierProductResponse>('/api/product/my_list', {
            params: {
                limit: pageCount,
                offset: pageCount * (activePage - 1),
                query_string
            }
        });
        setData(response.data);
        setTotalPages(Math.ceil(response.data.total_count / pageCount))
    })

    return {
        fetchSuppliersProducts,
        suppliersProductsIsLoading,
        error,
        data,
        activePage,
        totalPages,
        setActivePage,
        setData,
        query_string,
        setQuery
    }
}