import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const slice = createSlice({
  name: "productReview",
  initialState: {
    error: [],
    loading: false,
    success: false,
  },
  reducers: {
    productReviewRequested: (productReview, action) => {
      productReview.loading = true;
    },
    productReviewRequestFailed: (productReview, action) => {
      productReview.loading = false;
      productReview.error = action.payload;
    },
    productReviewReceived: (productReview, action) => {
      productReview.success = true;
      productReview.loading = false;
    },
    productReviewReset: (productReview, action) => {
      return {
        error: [],
        loading: false,
        success: false,
      };
    },
  },
});

export const {
  productReviewReceived,
  productReviewRequested,
  productReviewRequestFailed,
  productReviewReset,
} = slice.actions;
export default slice.reducer;

// Action Creators
export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: productReviewRequested.type,
      });

      const { userInfo } = getState().entities.users;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`/api/products/${productId}/reviews`, review, config);

      dispatch({
        type: productReviewReceived.type,
      });
    } catch (error) {
      dispatch({
        type: productReviewRequestFailed.type,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
