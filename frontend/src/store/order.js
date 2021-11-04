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
  },
});

export const { orderReceived, orderRequested, orderRequestFailed } =
  slice.actions;
export default slice.reducer;

// Action Creators
export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: orderRequested.type,
        })

        const { userInfo } = getState().entities.users;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            },
        };

        const { data } = await axios.post(`/api/orders`, order, config);

        dispatch({
            type: orderReceived.type,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: orderRequestFailed.type,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
};
