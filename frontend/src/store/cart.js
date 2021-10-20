import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan, apiCallSuccess } from "./api";

const slice = createSlice({
  name: "cartItem",
  initialState: {
    Items: [],
  },
  reducers: {
    cartAdded: (cartItem, action) => {
      const item = action.payload;

      const qty = 1;

      const existItem = cartItem.Items.find((x) => x.product === item._id);

      if (existItem) {
        return {
          ...cartItem,
          Items: cartItem.Items.map((x) =>
            x.product === existItem.product
              ? {
                  product: item._id,
                  name: item.name,
                  image: item.image,
                  price: item.price,
                  countInStock: item.countInStock,
                  qty,
                }
              : x
          ),
        };
      } else {
        return {
          ...cartItem,
          Items: [
            ...cartItem.Items,
            {
              product: item._id,
              name: item.name,
              image: item.image,
              price: item.price,
              countInStock: item.countInStock,
              qty,
            },
          ],
        };
      }
    },
  },
});

export const { cartAdded } = slice.actions;
export default slice.reducer;

const url = "/products";
export const addToCart = (id, qty) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: url + "/" + id,
      onSuccess: cartAdded.type,
    })
  );
  localStorage.setItem(
    "cartItem",
    JSON.stringify(getState().entities.cartItem)
  );
};
