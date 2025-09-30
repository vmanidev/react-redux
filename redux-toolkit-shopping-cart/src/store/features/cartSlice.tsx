import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../types";

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      state.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<CartItem>) => {
      return state.filter(({ id }) => action.payload.id !== id);
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
