export type CartItem = {
    id: string
    name: string,
    quantity: number
}

export type Product = {
    id: string,
    title: string,
    price: number,
    description?: string,
    category: string,
    image?: string
}
