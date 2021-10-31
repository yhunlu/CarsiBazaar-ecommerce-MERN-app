import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "shipping",
    initialState: {
        shippingAddress: {}
    },
    reducers: {
        cartSaveShippingAddress: (shipping, action) => {
            return {
                ...shipping,
                shippingAddress: action.payload,
            }
        }
    },
});

export const { cartSaveShippingAddress } = slice.actions;
export default slice.reducer;

export const saveShippingAddress = (data) => async (dispatch, getState) => {
    dispatch({
        type: cartSaveShippingAddress.type,
        payload: data,
    });
    localStorage.setItem(
        "shippingAddress",
        JSON.stringify(data)
    );
};
