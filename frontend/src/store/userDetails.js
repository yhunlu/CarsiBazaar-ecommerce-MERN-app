import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import axios from "axios";

const slice = createSlice({
    name: "userDetails",
    initialState: {
        user: [],
        error: [],
        loading: false,
    },
    reducers: {
        userDetailsRequested: (userDetails, action) => {
            return {
                ...userDetails, loading: true,
            }
        },
        userDetailsRequestFailed: (userDetails, action) => {
            userDetails.loading = false;
            userDetails.error = action.payload;
        },
        userDetailsReceived: (userDetails, action) => {
            userDetails.user = action.payload;
            userDetails.loading = false;
        },
    },
});

export const {
    userDetailsReceived,
    userDetailsRequested,
    userDetailsRequestFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators
export const getUserDetails =
    (id) => async (dispatch, getState) => {

        try {
            dispatch({
                type: userDetailsRequested.type,
            })

            const { userInfo } = getState().entities.users;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`
                },
            };

            const { data } = await axios.get(`/api/users/${id}`, config);

            dispatch({
                type: userDetailsReceived.type,
                payload: data
            });
        } catch (error) {
            dispatch({
                type: userDetailsRequestFailed.type,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            })
        }

    };
