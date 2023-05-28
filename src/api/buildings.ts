// import { useEffect, useState } from "react";
// import api from "./api";
// import { Building, BuildingResponse } from "../types/gis";

import { useState } from "react";
import { Building, BuildingResponse } from "../types/gis";
import { useFetching } from "../hooks/useFetching";
import api from "./api";

export function useBuildingsList() {
    const [buildings, setBuildings] = useState<BuildingResponse[]>([]);
    const { isLoading, fetching, error } = useFetching(async () => {
        const response = await api.get<BuildingResponse[]>("/api/gis/buildings");
        setBuildings(response.data);
    })
    return {
        buildings, setBuildings, fetching, error, isLoading
    }
}

export function useAddBuilding() {
    const { isLoading, fetching, error } = useFetching(async (building: Building) => {
        await api.post<BuildingResponse>("/api/gis/create_building", {}, { params: building }); // Изменить путь к добавлению здания в соответствии с API
    })
    return {
        fetching, isLoading, error
    }
}