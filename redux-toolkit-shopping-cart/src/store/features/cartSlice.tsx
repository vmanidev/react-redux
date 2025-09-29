import { createSlice } from "@reduxjs/toolkit";
import type { CartItem } from "../types";

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {},
});

export default cartSlice.reducer;
