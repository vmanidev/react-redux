import {
  createAsyncThunk,
  createSlice,
  type ActionReducerMapBuilder,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { ErrorPayload, Product, ProductState } from "../types";

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
  extraReducers: (builder: ActionReducerMapBuilder<ProductState>) => {
    builder.addCase(getProductList.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(
      getProductList.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.data = action.payload;
        state.error = null;
        state.status = "success";
      }
    );

    builder.addCase(
      getProductList.rejected,
      (state, action: PayloadAction<ErrorPayload>) => {
        state.data = [];
        state.error = action.payload;
        state.status = "failed";
      }
    );
  },
});

export default productsSlice.reducer;
