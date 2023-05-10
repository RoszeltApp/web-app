import { useState } from "react";
import { Supplier } from "../types/SuppliersTypes";
import api from "./api";
import { useFetching } from "../hooks/useFetching";


export function useSuppliersList() {
    const initialState: Supplier[] = []
    const [data, setData] = useState(initialState);

    const { fetching: fetchSupplierList, isLoading: suppliersListisLoading, error } = useFetching(async () => {
        const response = await api.get<Supplier[]>('/api/user/suppliers');
        setData(response.data);
    });

    return {
        fetchSupplierList,
        suppliersListisLoading,
        error,
        data,
    }
}