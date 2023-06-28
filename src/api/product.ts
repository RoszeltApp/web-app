import { useState } from "react";
import { ProductResponse } from "../types/ProductTypes";
import { Product } from "../types/ProductCardTypes";
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

    const [selectedClasses, setClasses] = useState<string[]>([]);
    const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);

    const fetchCatalog = async () => {
        let params: any = {
            limit: pageCount,
            offset: pageCount * (activePage - 1),
            query_string,
        }
        if (price_max !== "") params = { ...params, price_max }
        if (price_min !== "") params = { ...params, price_min }

        if (selectedClasses.length !== 0) {
            params = { ...params, category: [...selectedClasses].join(',') }
        }

        if (selectedSuppliers.length !== 0) {
            params = { ...params, suppliers: [...selectedSuppliers].join(',') }
        }


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
        selectedClasses,
        setClasses,
        selectedSuppliers,
        setSelectedSuppliers
    };
}

export function useCard(product_id: string) {
    const initialState: Product = {
        name: "default",
        article: "10000000",
        id: -1,
        class_id: null,
        brand: "default",
        mapping: []
    }
    const [data, setData] = useState(initialState);
    const fetchCard = async () => {

        let params: any = {
            product_id: product_id,
        }
        const response = await api.get<Product>('/api/product/card', {
            params
        });

        console.log(response)
        setData(response.data)
    }

    const { fetching, isLoading, error } = useFetching(fetchCard)

    return { fetching, isLoading, error, data };
}