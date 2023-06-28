import { Offer } from './ProductCardTypes';


export type Product = {
    name: string,
    article: string,
    id: number,
    class_id: number | null,
    brand: string | null,
    mapping: Offer[],
    class_product: {
        id: number,
        class_icon: string,
        class_params: null,
        name: string
    }
}

export type ProductResponse = {
    total_count: number,
    data: Product[],
}

export type SupplierProduct = {
    user_id: number,
    product_id: number,
    id: number,
    product: {
        name: string,
        article: string,
        id: number,
        class_id: number | null,
        class_product: {
            id: string,
            class_icon: string,
            class_params: null,
            name: string
        }
    },
    stock: {
        quantity: number,
        price: number,
        id: number
    },
}

export type SupplierProductResponse = {
    total_count: number,
    data: SupplierProduct[],
}

export type ProductProps = {
    name: string,
    value: string,
}


export type UploadInfo = {
    article: string,
    id: number
}


export type UploadProductResponse = {
    download_products: number,
    products_failed: string[],
    success_products: UploadInfo[],
}