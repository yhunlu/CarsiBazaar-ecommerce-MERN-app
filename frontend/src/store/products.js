import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import moment from "moment";

const slice = createSlice({
  name: "products",
  initialState: {
    lists: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    productsRequested: (products, action) => {
      products.loading = true;
    },
    productsRequestFailed: (products, action) => {
      products.loading = false;
    },
    // products/productsReceived
    productsReceived: (products, action) => {
      products.lists = action.payload;
      products.loading = false;
      products.lastFetch = Date.now();
    },
  },
});

export const {
  productsReceived,
  productsRequested,
  productsRequestFailed,
  productAdded,
} = slice.actions;
export default slice.reducer;

// Action Creators
const url = "/products";
// () => fn (dispatch, getState)
export const loadProducts = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.products;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;

  dispatch(
    apiCallBegan({
      url,
      onStart: productsRequested.type,
      onSuccess: productsReceived.type,
      onError: productsRequestFailed.type,
    })
  );
};
