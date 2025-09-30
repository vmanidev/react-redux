import {
  createAsyncThunk,
  createSlice,
  type ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import type { ProductState } from "../types";

const initialState: ProductState = {
  data: [],
  status: "idle",
  error: null,
};

const getProductList = createAsyncThunk(
  "products/getProductList",
  async () => {}
);

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<ProductState>) => {},
});

export default productsSlice.reducer;
