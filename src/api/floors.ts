import { Floor, FloorResponse } from "../types/gis";
import { useState } from "react";
import { useFetching } from "../hooks/useFetching";
import api from "./api";

export function useFloorsList(build_id: number) {
    const [floors, setFloors] = useState<FloorResponse[]>([]);
    const { isLoading, fetching } = useFetching(async () => {
        const response = await api.get<FloorResponse[]>("/api/gis/get_floors", { params: { build_id: build_id } });
        setFloors(response.data);
    })
    return {
        floors, setFloors, fetching, isLoading
    }
}

export function useAddFloor() {
    const { isLoading, fetching, error } = useFetching(async (building: Floor) => {
        await api.post<FloorResponse>("/api/gis/upload_plans_floors", {}, { params: building }); // Изменить путь к добавлению этажа в соответствии с API
    })
    return {
        fetching, isLoading, error
    }
}