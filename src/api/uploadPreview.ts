import api from "./api";


export function useUploadPreview() {
    const uploadPreview = async (product_id: number, file: File) => {
        var formData = new FormData();
        formData.append("upload_file", file)

        const response = await api.post('/api/product/upload_main_image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            params: {
                product_id
            }
        })
        return response;
    }

    return {
        uploadPreview
    }
}