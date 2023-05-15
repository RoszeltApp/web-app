import api from "./api";


export function useUploadGallery() {
    const uploadGallery = async (product_id: number, files: File[]) => {
        var formData = new FormData();
        files.forEach((element) => formData.append("upload_file", element))

        const response = await api.post('/api/product/upload_gallery', formData, {
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
        uploadGallery
    }
}