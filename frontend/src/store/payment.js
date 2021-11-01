import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "payment",
    initialState: {
        paymentMethod: {}
    },
    reducers: {
        savePaymentMethod: (payment, action) => {
            return {
                ...payment,
                paymentMethod: action.payload,
            }
        }
    },
});

export const { savePaymentMethod } = slice.actions;
export default slice.reducer;

export const saveShippingAddress = (data) => async (dispatch, getState) => {
    dispatch({
        type: savePaymentMethod.type,
        payload: data,
    });
    localStorage.setItem(
        "paymentMethod",
        JSON.stringify(data)
    );
};
