import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const slice = createSlice({
  name: "order",
  initialState: {
    lists: [],
    error: [],
    loading: false,
    success: false,
  },
  reducers: {
    orderRequested: (order, action) => {
      order.loading = true;
    },
    orderRequestFailed: (order, action) => {
      order.loading = false;
      order.error = action.payload;
    },
    // order/orderReceived
    orderReceived: (order, action) => {
      order.lists = action.payload;
      order.loading = false;
      order.success = true;
    },
    orderDetailsRequested: (order, action) => {
      return {
        ...order,
        loading: true,
      };
    },
    orderDetailsRequestFailed: (order, action) => {
      order.loading = false;
      order.error = action.payload;
    },
    orderDetailsReceived: (order, action) => {
      order.lists = action.payload;
      order.loading = false;
    },
    orderPayRequested: (order, action) => {
      order.loading = true;
    },
    orderPayRequestFailed: (order, action) => {
      order.loading = false;
      order.error = action.payload;
    },
    orderPayReceived: (order, action) => {
      order.success = true;
      order.loading = false;
    },
    orderPayReset: (order, action) => {
      return {
        lists: [],
        error: [],
        loading: false,
        success: false,
      };
    },
  },
});

export const {
  orderReceived,
  orderRequested,
  orderRequestFailed,
  orderDetailsReceived,
  orderDetailsRequested,
  orderDetailsRequestFailed,
  orderPayReceived,
  orderPayRequested,
  orderPayRequestFailed,
  orderPayReset,
} = slice.actions;
export default slice.reducer;

// Action Creators
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderRequested.type,
    });

    const { userInfo } = getState().entities.users;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/orders`, order, config);

    dispatch({
      type: orderReceived.type,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: orderRequestFailed.type,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
  localStorage.setItem("order", JSON.stringify(getState().entities.order));
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderDetailsRequested.type,
    });

    const { userInfo } = getState().entities.users;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: orderDetailsReceived.type,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: orderDetailsRequestFailed.type,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateOrderPay =
  (id, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({
        type: orderPayRequested.type,
      });

      const { userInfo } = getState().entities.users;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${id}/pay`,
        paymentResult,
        config
      );

      dispatch({
        type: orderPayReceived.type,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: orderPayRequestFailed.type,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
