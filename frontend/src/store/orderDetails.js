import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const slice = createSlice({
    name: "orderDetails",
    initialState: {
        orderItems: [],
        shippingAddress: {},
        error: [],
        loading: false,
    },
    reducers: {
        orderDetailsRequested: (orderDetails, action) => {
            return {
                ...orderDetails, loading: true,
            }
        },
        orderDetailsRequestFailed: (orderDetails, action) => {
            orderDetails.loading = false;
            orderDetails.error = action.payload;
        },
        orderDetailsReceived: (orderDetails, action) => {
            orderDetails.orderItems = action.payload;
            orderDetails.loading = false;
        },
    },
});

export const {
    orderDetailsReceived,
    orderDetailsRequested,
    orderDetailsRequestFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators
export const getOrderDetails =
    (id) => async (dispatch, getState) => {

        try {
            dispatch({
                type: orderDetailsRequested.type,
            })

            const { userInfo } = getState().entities.users;

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                },
            };

            const { data } = await axios.get(`/api/orders/${id}`, config);

            dispatch({
                type: orderDetailsReceived.type,
                payload: data
            });
        } catch (error) {
            dispatch({
                type: orderDetailsRequestFailed.type,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            })
        }

    };