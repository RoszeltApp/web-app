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