import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const slice = createSlice({
  name: "userDetails",
  initialState: {
    user: [],
    error: [],
    loading: false,
    success: false,
  },
  reducers: {
    userDetailsRequested: (userDetails, action) => {
      return {
        ...userDetails,
        loading: true,
      };
    },
    userDetailsRequestFailed: (userDetails, action) => {
      userDetails.loading = false;
      userDetails.error = action.payload;
    },
    userDetailsReceived: (userDetails, action) => {
      userDetails.user = action.payload;
      userDetails.loading = false;
    },
    userDetailsLogout: (userDetails, action) => {
      return {
        user: [],
        error: [],
        loading: false,
        success: false,
      };
    },
    updateProfileRequested: (userDetails, action) => {
      userDetails.loading = true;
    },
    updateProfileRequestFailed: (userDetails, action) => {
      userDetails.loading = false;
      userDetails.error = action.payload;
    },
    updateProfileReceived: (userDetails, action) => {
      userDetails.user = action.payload;
      userDetails.success = true;
      userDetails.loading = false;
    },
  },
});

export const {
  userDetailsReceived,
  userDetailsRequested,
  userDetailsRequestFailed,
  userDetailsLogout,
  updateProfileReceived,
  updateProfileRequested,
  updateProfileRequestFailed,
} = slice.actions;
export default slice.reducer;

export const logoutUserDetails = () => (dispatch, getState) => {
  dispatch({ type: userDetailsLogout.type });
};

// Action Creators
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: userDetailsRequested.type,
    });

    const { userInfo } = getState().entities.users;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: userDetailsReceived.type,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: userDetailsRequestFailed.type,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: updateProfileRequested.type,
    });

    const { userInfo } = getState().entities.users;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({
      type: updateProfileReceived.type,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: updateProfileRequestFailed.type,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
