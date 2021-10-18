import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "productDetail",
  initialState: {
    product: [],
    error: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    productDetailRequested: (productDetail, action) => {
      productDetail.loading = true;
    },
    productDetailRequestFailed: (productDetail, action) => {
      productDetail.loading = false;
      productDetail.error = action.payload;
    },
    // productDetail/productDetailReceived
    productDetailReceived: (productDetail, action) => {
      productDetail.product = action.payload;
      productDetail.loading = false;
      productDetail.lastFetch = Date.now();
    },
  },
});

export const {
  productDetailReceived,
  productDetailRequested,
  productDetailRequestFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators
const url = "/products";
export const loadProductById = (productId) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: url + "/" + productId,
      onStart: productDetailRequested.type,
      onSuccess: productDetailReceived.type,
      onError: productDetailRequestFailed.type,
    })
  );
};
