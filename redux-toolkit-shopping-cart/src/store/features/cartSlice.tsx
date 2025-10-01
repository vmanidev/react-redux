import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, Product } from "../types";

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      state.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<Product>) => {
      return state.filter((item) => item.product.id !== action.payload.id);
    },
    increaseItemQuantity: (state, action: PayloadAction<Product>) => {
      state.forEach((item) => {
        if (item.product.id === action.payload.id) item.quantity += 1;
      });
    },
    decreaseItemQuantity: (state, action: PayloadAction<Product>) => {
      state.forEach((item) => {
        if (item.product.id === action.payload.id) item.quantity -= 1;
      });
    },
    clearCart: (state) => {
      state.length = 0;
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
