import api from "./api"

export function useDeleteProduct() {
    const fetch = async (id: number) => {
        const response = await api.delete('/api/product/delete_products', {
            params: {
                id,
            }
        })

        console.log(response);
    }

    return {
        fetch
    }
}