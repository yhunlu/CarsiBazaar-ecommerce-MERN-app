import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const slice = createSlice({
  name: "orderListDetail",
  initialState: {
    order: [],
    error: [],
    errorDeliver: [],
    loading: false,
    loadingDeliver: false,
    success: false,
  },
  reducers: {
    orderListDetailRequested: (orderListDetail, action) => {
      orderListDetail.loading = true;
    },
    orderListDetailRequestFailed: (orderListDetail, action) => {
      orderListDetail.loading = false;
      orderListDetail.error = action.payload;
    },
    orderListDetailReceived: (orderListDetail, action) => {
      orderListDetail.order = action.payload;
      orderListDetail.loading = false;
    },
    orderListDetailReset: (orderListDetail, action) => {
      return {
        order: { user: [], shippingAddress: [], orderItems: [] },
        error: [],
        loading: false,
      };
    },
    orderUpdateDeliverRequested: (orderListDetail, action) => {
      orderListDetail.loadingDeliver = true;
      orderListDetail.errorDeliver = [];
    },
    orderUpdateDeliverFailed: (orderListDetail, action) => {
      orderListDetail.loadingDeliver = false;
      orderListDetail.errorDeliver = action.payload;
    },
    orderUpdateDeliverReceived: (orderListDetail, action) => {
      orderListDetail.success = true;
      orderListDetail.loadingDeliver = false;
    },
  },
});

export const {
  orderListDetailReceived,
  orderListDetailRequested,
  orderListDetailRequestFailed,
  orderListDetailReset,
  orderUpdateDeliverRequested,
  orderUpdateDeliverFailed,
  orderUpdateDeliverReceived,
} = slice.actions;
export default slice.reducer;

// Action Creators
export const ResetOrderListDetail = () => (dispatch, getState) => {
  dispatch({ type: orderListDetailReset.type });
};

export const getOrderListDetailById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderListDetailRequested.type,
    });

    const { userInfo } = getState().entities.users;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/admin/detail/${id}`, config);

    dispatch({
      type: orderListDetailReceived.type,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: orderListDetailRequestFailed.type,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateDelivery = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderUpdateDeliverRequested.type,
    });

    const { userInfo } = getState().entities.users;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      config
    );

    dispatch({
      type: orderUpdateDeliverReceived.type,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: orderUpdateDeliverFailed.type,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
