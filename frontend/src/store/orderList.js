import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const slice = createSlice({
  name: "orderList",
  initialState: {
    orders: [],
    pages: [],
    page: [],
    error: [],
    loading: false,
    success: false,
  },
  reducers: {
    orderListRequested: (orderList, action) => {
      orderList.loading = true;
    },
    orderListRequestFailed: (orderList, action) => {
      orderList.loading = false;
      orderList.error = action.payload;
    },
    orderListReceived: (orderList, action) => {
      orderList.orders = action.payload.orders;
      orderList.pages = action.payload.pages;
      orderList.page = action.payload.page;
      orderList.loading = false;
    },
    orderListDeleteRequested: (orderList, action) => {
      orderList.success = false;
    },
    orderListDeleteRequestFailed: (orderList, action) => {
      orderList.success = false;
      orderList.error = action.payload;
    },
    orderListDeleteReceived: (orderList, action) => {
      orderList.success = true;
    },
  },
});

export const {
  orderListReceived,
  orderListRequested,
  orderListRequestFailed,
  orderListDeleteReceived,
  orderListDeleteRequested,
  orderListDeleteRequestFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators
export const fetchOrderList =
  (keyword = "", pageNumber = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: orderListRequested.type,
      });

      const { userInfo } = getState().entities.users;

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/orders/?keyword=${keyword}&pageNumber=${pageNumber}`,
        config
      );

      dispatch({
        type: orderListReceived.type,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: orderListRequestFailed.type,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteOrderById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderListDeleteRequested.type,
    });

    const { userInfo } = getState().entities.users;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/orders/${id}`, config);

    dispatch({
      type: orderListDeleteReceived.type,
    });
  } catch (error) {
    dispatch({
      type: orderListDeleteRequestFailed.type,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
