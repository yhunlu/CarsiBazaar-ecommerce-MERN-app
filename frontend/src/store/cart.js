import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const slice = createSlice({
  name: "cartItem",
  initialState: {
    Items: [],
  },
  reducers: {
    cartAdded: (cartItem, action) => {
      const item = action.payload;

      const existItem = cartItem.Items.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...cartItem,
          Items: cartItem.Items.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...cartItem,
          Items: [...cartItem.Items, item],
        };
      }
    },
    cartRemoved: (cartItem, action) => {
      return {
        ...cartItem,
        Items: cartItem.Items.filter((x) => x.product !== action.payload),
      };
    },
  },
});

export const { cartAdded, cartRemoved } = slice.actions;
export default slice.reducer;

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: cartAdded.type,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem(
    "cartItem",
    JSON.stringify(getState().entities.cartItem)
  );
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: cartRemoved.type,
    payload: id,
  });
  localStorage.setItem(
    "cartItem",
    JSON.stringify(getState().entities.cartItem)
  );
};