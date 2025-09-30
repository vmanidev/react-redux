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

const getProductList = createAsyncThunk<
  Product[],
  void,
  { rejectValue: ErrorPayload }
>("products/getProductList", async (_, thunkAPI) => {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok)
    return thunkAPI.rejectWithValue({ message: "Failed to get products." });
  const data = await response.json();
  return data;
});

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
      (state, action: PayloadAction<ErrorPayload | undefined>) => {
        state.data = [];
        state.error = action.payload ?? { message: "Failed to get products." };
        state.status = "failed";
      }
    );
  },
});

export default productsSlice.reducer;
