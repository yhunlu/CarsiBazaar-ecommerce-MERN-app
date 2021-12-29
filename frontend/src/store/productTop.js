import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "productTop",
  initialState: {
    products: [],
    error: [],
    loading: false,
  },
  reducers: {
    productTopRequested: (productTop, action) => {
      productTop.loading = true;
    },
    productTopRequestFailed: (productTop, action) => {
      productTop.loading = false;
      productTop.error = action.payload;
    },
    productTopReceived: (productTop, action) => {
      productTop.products = action.payload;
      productTop.loading = false;
    },
  },
});

export const {
  productTopReceived,
  productTopRequested,
  productTopRequestFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators
const url = "/products/top";
export const getproductTop = () => async (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url,
      onStart: productTopRequested.type,
      onSuccess: productTopReceived.type,
      onError: productTopRequestFailed.type,
    })
  );
};
