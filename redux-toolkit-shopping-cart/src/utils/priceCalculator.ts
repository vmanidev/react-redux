import type { CartItem } from "../store/types";

export const calculatePrice = (price: number, quantity: number) => (price * quantity);

export const grandTotal = (cartData: CartItem[]) => cartData
    .map(item => {
        const itemTotalPrice = item.product.price * item.quantity;
        return itemTotalPrice;
    })
    .reduce((acc, price) => acc + price, 0)