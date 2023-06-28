import { FloorResponse } from "../types/gis";
import { useState } from "react";
import { useFetching } from "../hooks/useFetching";
import api from "./api";

export function useFloorsList() {
    const [floors, setFloors] = useState<FloorResponse[]>([]);
    const { isLoading, fetching } = useFetching(async (build_id: number) => {
        const response = await api.get<FloorResponse[]>("/api/gis/get_floors", { params: { build_id: build_id } });
        setFloors(response.data);
    })
    return {
        floors, setFloors, fetching, isLoading
    }
}

export function useAddFloor() {
    const { isLoading, fetching, error } = useFetching(async (name: string,
        building_id: number,
        auditories: File,
        doors: File,
        stairs: File,
        windows: File,
        pol: File,
        foundation: File,
        walls_inter: File,
        walls_outer: File) => {

        var formData = new FormData();
        formData.append('auditories', auditories);
        formData.append('doors', doors);
        formData.append('stairs', stairs);
        formData.append('windows', windows);
        formData.append('pol', pol);
        formData.append('foundation', foundation);
        formData.append('walls_inter', walls_inter);
        formData.append('walls_outer', walls_outer);

        await api.post<FloorResponse>("/api/gis/upload_plans_floors", formData, {
            params: {
                name,
                building_id
            }
        }); // Изменить путь к добавлению этажа в соответствии с API
    })
    return {
        fetching, isLoading, error
    }
}