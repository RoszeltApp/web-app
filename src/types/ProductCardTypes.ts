export type Offer = {
    user_id: number,
    product_id: number,
    id: number,
    image: string | null,
    media: SingleImage[],
    user: User,
    props: Prop[],
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
    brand: string | null,
    mapping: Offer[]
}

export type SingleImage = {
    id: number,
    path: string,
    user_product_id: number,
}

export type User = {
    id: number,
    name: string,
}

export type Prop = {
    id: number,
    name: string,
    value: string,
}