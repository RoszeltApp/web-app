import { useState } from "react";
import { ComponentLayerResponse } from "../types/gis";
import { useFetching } from "../hooks/useFetching";
import api from "./api";

export function useComponentsLayer() {
    const [compList, setCompList] = useState<ComponentLayerResponse[]>([]);

    const { fetching: fetchCompLayer } = useFetching(async (floor_id: number) => {
        const response = await api.get('/api/gis/get_layer_components', {
            params: {
                floor_id
            }
        })
        setCompList(response.data);
    })

    const { fetching: fetchAddComp } = useFetching(async (floor_id: number, product_offer_id: number, lat: number, long: number) => {
        await api.post('/api/gis/place_component', {}, {
            params: {
                floor_id, product_offer_id, lat, long
            }
        })
    })

    const { fetching: fetchDelComp } = useFetching(async (id: number) => {
        await api.delete('/api/gis/delete_place_component', {
            params: {
                id
            }
        })
    })

    const clear = () => {
        setCompList([]);
    }

    return {
        compList,
        fetchCompLayer,
        fetchAddComp,
        fetchDelComp,
        clear
    }
}