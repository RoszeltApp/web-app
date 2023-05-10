export type Offer = {
    user_id: number,
    product_id: number,
    id: number,
    user: {
        id: number,
        name: string
    },
    stock: {
        quantity: number,
        price: number,
        id: number
    }
}


export type Product = {
    name: string,
    article: string,
    id: number,
    class_id: number | null,
    mapping: Offer[]
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
        class_id: number | null
    },
    stock: {
        quantity: number,
        price: number,
        id: number
    }
}

export type SupplierProductResponse = {
    total_count: number,
    data: SupplierProduct[],
}