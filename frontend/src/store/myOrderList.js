import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const slice = createSlice({
  name: "myOrderList",
  initialState: {
    orders: [],
    error: [],
    loading: false,
  },
  reducers: {
    myOrderListRequested: (myOrderList, action) => {
      myOrderList.loading = true;
    },
    myOrderListRequestFailed: (myOrderList, action) => {
      myOrderList.loading = false;
      myOrderList.error = action.payload;
    },
    myOrderListReceived: (myOrderList, action) => {
      myOrderList.orders = action.payload;
      myOrderList.loading = false;
    },
  },
});

export const {
  myOrderListReceived,
  myOrderListRequested,
  myOrderListRequestFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators
export const getMyOrderList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: myOrderListRequested.type,
    });

    const { userInfo } = getState().entities.users;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/orders/myorders", config);

    dispatch({
      type: myOrderListReceived.type,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: myOrderListRequestFailed.type,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
