import { useState } from "react";
import { ClassComp } from "../types/Classes";
import { useFetching } from "../hooks/useFetching";
import api from "./api";



export function useClasses() {

    const [classList, setClassList] = useState<ClassComp[]>([]);

    const { fetching: fetchClasses } = useFetching(async () => {
        const response = await api.get<ClassComp[]>('/api/product/classes');
        setClassList(response.data);
    })

    return {
        fetchClasses,
        classList
    }
}