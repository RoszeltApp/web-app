export type Building = {
    address: string,
    name: string,
}

export type Floor = {
    doors: string,
    windows: string,
    foundation: string,
    walls_outer: string,
    build_id: number,
    auditories: string,
    stairs: string,
    Pol: string,
    walls_inter: string,
    name: string,
}

export type BuildingResponse = {
    id: number,
    user_id: number,
    address: string,
    name: string,
}

export type FloorResponse = {
    id: number,
    doors: string,
    windows: string,
    foundation: string,
    walls_outer: string,
    build_id: number,
    auditories: string,
    stairs: string,
    Pol: string,
    walls_inter: string,
    name: string,
}

export type ComponentLayerResponse = {
    floor_id: number,
    product_offer_id: number,
    long: number,
    id: number,
    lat: number,
    product_offer: {
        user_id: number,
        product_id: number,
        id: number,
        image: string,
        stock: {
            quantity: number,
            price: number,
            id: number
        },
        product: {
            id: number,
            brand: string,
            name: string,
            article: string,
            class_id: number,
            class_product: {
                id: number,
                class_icon: string,
                name: string,
            }
        }
    }
}