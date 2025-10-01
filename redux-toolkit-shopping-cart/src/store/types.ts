import type store from "./store"

export type CartItem = {
    product: Product
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

export interface ErrorPayload {
    message: string
}

export type ProductState = {
    data: Product[],
    status: "idle" | "loading" | "success" | "failed",
    error: ErrorPayload | null
}

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;