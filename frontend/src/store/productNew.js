import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const slice = createSlice({
  name: "productNew",
  initialState: {
    product: [],
    error: [],
    loading: false,
    success: false,
  },
  reducers: {
    productCreateRequested: (productNew, action) => {
      productNew.loading = true;
      productNew.success = false;
    },
    productCreateFailed: (productNew, action) => {
      productNew.loading = false;
      productNew.success = false;
      productNew.error = action.payload;
    },
    productCreateReceived: (productNew, action) => {
      productNew.loading = false;
      productNew.success = true;
      productNew.product = action.payload;
    },
    productCreateReset: (productNew, action) => {
      return {
        product: [],
        error: [],
        loading: false,
        success: false,
      };
    },
    productUpdateRequested: (productNew, action) => {
      productNew.loading = true;
      productNew.success = false;
    },
    productUpdateFailed: (productNew, action) => {
      productNew.loading = false;
      productNew.success = false;
      productNew.error = action.payload;
    },
    productUpdateReceived: (productNew, action) => {
      productNew.loading = false;
      productNew.success = true;
      productNew.product = action.payload;
    },
  },
});

export const {
  productCreateRequested,
  productCreateReceived,
  productCreateFailed,
  productCreateReset,
  productUpdateRequested,
  productUpdateReceived,
  productUpdateFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators
export const resetProduct = () => (dispatch, getState) => {
  dispatch({ type: productCreateReset.type });
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: productCreateRequested.type,
    });

    const { userInfo } = getState().entities.users;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products`, {}, config);

    dispatch({
      type: productCreateReceived.type,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: productCreateFailed.type,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: productUpdateRequested.type,
    });

    const { userInfo } = getState().entities.users;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({
      type: productUpdateReceived.type,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: productUpdateFailed.type,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
