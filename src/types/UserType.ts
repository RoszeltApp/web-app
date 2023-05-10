export type User = {
    id: number,
    name: string,
    company_name: string,
    mail: string,
    phone: string,
    role: {
        id: number,
        role_name: string
    },
    exp: string,
    type: string
}

export type UserLogin = {
    name: string,
    password: string,
}

export type UserRegister = {
    name: string,
    company_name: string,
    mail: string,
    phone: string,
    password: string,
    role_code: number
}