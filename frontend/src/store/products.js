import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";

const slice = createSlice({
  name: "products",
  initialState: {
    lists: [],
    error: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    productsRequested: (products, action) => {
      products.loading = true;
    },
    productsRequestFailed: (products, action) => {
      products.loading = false;
      products.error = action.payload;
    },
    // products/productsReceived
    productsReceived: (products, action) => {
      products.lists = action.payload;
      products.loading = false;
      products.lastFetch = Date.now();
    },
  },
});

export const { productsReceived, productsRequested, productsRequestFailed } =
  slice.actions;
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

export const getProductsById = (productId) =>
  createSelector(
    (state) => state.entities.products,
    (products) =>
      products.lists.filter((product) => product.productId === productId)
  );
