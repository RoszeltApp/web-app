import axios from "axios";
import { useFetching } from "../hooks/useFetching";

export function usePoligoneLayer(setData: (value: React.SetStateAction<undefined>) => void) {
    const { fetching: getLayer } = useFetching(async (name: string) => {
        const response = await axios.get(`http://127.0.0.1:9000/testbucket/${name}`)
        setData(response.data)
    })

    return { getLayer }
}